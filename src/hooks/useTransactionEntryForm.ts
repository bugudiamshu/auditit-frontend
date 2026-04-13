import {useState} from 'react';
import {Platform} from 'react-native';
import {useCreateTransactionMutation} from '../store/transactionApi';
import {useSnackbar} from '../context/SnackbarContext';

type TransactionType = 'income' | 'expense';
type PaymentMode = 'cash' | 'online';

export type FormErrors = {
    amount?: string;
    transactionId?: string;
    personName?: string;
    general?: string;
};

export const useTransactionEntryForm = (navigation: any) => {
    const [type, setType] = useState<TransactionType>('income');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [referenceNo, setReferenceNo] = useState('');
    const [paymentMode, setPaymentMode] = useState<PaymentMode>('cash');
    const [transactionId, setTransactionId] = useState('');
    const [personName, setPersonName] = useState('');
    const [amount, setAmount] = useState('');
    const [remarks, setRemarks] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [createTransaction, {isLoading}] = useCreateTransactionMutation();
    const {show: showSnackbar} = useSnackbar();

    const personLabel = type === 'income' ? 'Collected From' : 'Paid To';
    const personPlaceholder = type === 'income' ? 'Enter payer name' : 'Enter recipient name';
    const amountHint = type === 'income' ? 'Amount received' : 'Amount paid out';
    const amountValue = (() => {
        const parsed = Number.parseFloat(amount);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    })();

    const validateForm = (): FormErrors => {
        const nextErrors: FormErrors = {};

        if (!amount.trim()) {
            nextErrors.amount = 'Amount is required.';
        } else if (Number.isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
            nextErrors.amount = 'Enter an amount greater than 0.';
        }

        if (!personName.trim()) {
            nextErrors.personName = `${personLabel} is required.`;
        }

        if (paymentMode === 'online' && !transactionId.trim()) {
            nextErrors.transactionId = 'Transaction ID is required for online payments.';
        }

        if (Object.keys(nextErrors).length > 0) {
            nextErrors.general = 'Please fix the highlighted fields before submitting.';
        }

        return nextErrors;
    };

    const updateFieldError = (field: keyof FormErrors, value: string) => {
        if (!hasSubmitted && !errors[field]) {
            return;
        }

        setErrors(prev => {
            const next = {...prev};

            if (field === 'amount') {
                if (!value.trim()) {
                    next.amount = 'Amount is required.';
                } else if (Number.isNaN(Number.parseFloat(value)) || Number.parseFloat(value) <= 0) {
                    next.amount = 'Enter an amount greater than 0.';
                } else {
                    delete next.amount;
                }
            }

            if (field === 'personName') {
                if (!value.trim()) {
                    next.personName = `${personLabel} is required.`;
                } else {
                    delete next.personName;
                }
            }

            if (field === 'transactionId') {
                if (paymentMode === 'online' && !value.trim()) {
                    next.transactionId = 'Transaction ID is required for online payments.';
                } else {
                    delete next.transactionId;
                }
            }

            next.general =
                next.amount || next.personName || next.transactionId
                    ? 'Please fix the highlighted fields before submitting.'
                    : undefined;

            return next;
        });
    };

    const handleDateChange = (_event: any, selectedDate?: Date) => {
        if (Platform.OS !== 'ios') {
            setShowDatePicker(false);
        }

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTypeChange = (nextType: TransactionType) => {
        setType(nextType);
        setErrors(prev => ({...prev, personName: undefined, general: undefined}));
    };

    const handlePaymentModeChange = (nextMode: PaymentMode) => {
        setPaymentMode(nextMode);
        if (nextMode === 'cash') {
            setTransactionId('');
            setErrors(prev => ({...prev, transactionId: undefined, general: undefined}));
        }
    };

    const onSubmit = async () => {
        setHasSubmitted(true);
        const nextErrors = validateForm();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            showSnackbar(nextErrors.general ?? 'Please review the form.', 'error');
            return;
        }

        try {
            const response = await createTransaction({
                type,
                transaction_date: date.toISOString().split('T')[0],
                amount: amountValue,
                payment_mode: paymentMode,
                reference_no: referenceNo.trim() || null,
                transaction_id: paymentMode === 'online' ? transactionId.trim() : null,
                person_name: personName.trim(),
                remarks: remarks.trim() || null,
            }).unwrap();

            showSnackbar(response.message || 'Transaction submitted successfully.', 'success');
            navigation.goBack();
        } catch (error: any) {
            const apiMessage =
                error?.data?.message || 'Unable to submit the transaction right now.';
            setErrors(prev => ({...prev, general: apiMessage}));
            showSnackbar(apiMessage, 'error');
        }
    };

    return {
        type,
        date,
        showDatePicker,
        referenceNo,
        paymentMode,
        transactionId,
        personName,
        amount,
        remarks,
        errors,
        isLoading,
        personLabel,
        personPlaceholder,
        amountHint,
        amountValue,
        setShowDatePicker,
        setReferenceNo,
        setTransactionId,
        setPersonName,
        setAmount,
        setRemarks,
        updateFieldError,
        handleDateChange,
        handleTypeChange,
        handlePaymentModeChange,
        onSubmit,
    };
};

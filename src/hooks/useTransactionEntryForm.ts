import {useState} from 'react';
import {Platform} from 'react-native';
import {pick, types, errorCodes, isErrorWithCode} from '@react-native-documents/picker';
import {launchCamera, launchImageLibrary, ImagePickerResponse} from 'react-native-image-picker';
import {useCreateTransactionMutation, useUpdateTransactionMutation} from '../store/transactionApi';
import {useSnackbar} from '../context/SnackbarContext';

type TransactionType = 'income' | 'expense';
type PaymentMode = 'cash' | 'online';

export type FormErrors = {
    amount?: string;
    transactionId?: string;
    personName?: string;
    general?: string;
};

// Normalized attachment type to handle both picker and camera
interface Attachment {
    uri: string;
    type?: string;
    name?: string;
}

export const useTransactionEntryForm = (navigation: any, editItem?: any, orgCode?: string) => {
    const [type, setType] = useState<TransactionType>(editItem?.type || 'income');
    const [date, setDate] = useState(editItem?.transaction_date ? new Date(editItem.transaction_date) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [referenceNo, setReferenceNo] = useState(editItem?.reference_no || '');
    const [paymentMode, setPaymentMode] = useState<PaymentMode>(editItem?.payment_mode || 'cash');
    const [transactionId, setTransactionId] = useState(editItem?.transaction_id || '');
    const [personName, setPersonName] = useState(editItem?.person_name || '');
    const [amount, setAmount] = useState(editItem?.amount ? editItem.amount.toString() : '');
    const [remarks, setRemarks] = useState(editItem?.remarks || '');
    const [document, setDocument] = useState<Attachment | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showUploadChoice, setShowUploadChoice] = useState(false);

    const [createTransaction, {isLoading: isCreating}] = useCreateTransactionMutation();
    const [updateTransaction, {isLoading: isUpdating}] = useUpdateTransactionMutation();
    const {show: showSnackbar} = useSnackbar();

    const isEdit = !!editItem;
    const isLoading = isCreating || isUpdating;

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

    const pickDocument = async () => {
        try {
            setShowUploadChoice(false);
            const result = await pick({
                type: [types.images, types.pdf],
            });
            
            if (result && result.length > 0) {
                setDocument({
                    uri: result[0].uri,
                    type: result[0].type || undefined,
                    name: result[0].name || undefined,
                });
            }
        } catch (err) {
            if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
                // Ignore
            } else {
                console.error(err);
                showSnackbar('Failed to pick document', 'error');
            }
        }
    };

    const capturePhoto = async () => {
        try {
            setShowUploadChoice(false);
            const result: ImagePickerResponse = await launchCamera({
                mediaType: 'photo',
                quality: 0.8,
                saveToPhotos: false,
            });

            if (result.didCancel) return;
            if (result.errorCode) {
                showSnackbar(result.errorMessage || 'Camera error', 'error');
                return;
            }

            const asset = result.assets?.[0];
            if (asset && asset.uri) {
                setDocument({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || `photo_${Date.now()}.jpg`,
                });
            }
        } catch (err) {
            console.error(err);
            showSnackbar('Failed to capture photo', 'error');
        }
    };

    const pickImage = async () => {
        try {
            setShowUploadChoice(false);
            const result: ImagePickerResponse = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
            });

            if (result.didCancel) return;
            if (result.errorCode) {
                showSnackbar(result.errorMessage || 'Gallery error', 'error');
                return;
            }

            const asset = result.assets?.[0];
            if (asset && asset.uri) {
                setDocument({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || `image_${Date.now()}.jpg`,
                });
            }
        } catch (err) {
            console.error(err);
            showSnackbar('Failed to pick image', 'error');
        }
    };

    const clearDocument = () => setDocument(null);

    const onSubmit = async () => {
        setHasSubmitted(true);
        const nextErrors = validateForm();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            showSnackbar(nextErrors.general ?? 'Please review the form.', 'error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('type', type);
            formData.append('transaction_date', date.toISOString().split('T')[0]);
            formData.append('amount', amountValue);
            formData.append('payment_mode', paymentMode);
            formData.append('person_name', personName.trim());
            
            if (referenceNo.trim()) formData.append('reference_no', referenceNo.trim());
            if (paymentMode === 'online' && transactionId.trim()) formData.append('transaction_id', transactionId.trim());
            if (remarks.trim()) formData.append('remarks', remarks.trim());
            
            if (document) {
                formData.append('document', {
                    uri: document.uri,
                    type: document.type || 'application/octet-stream',
                    name: document.name,
                } as any);
            }

            if (isEdit) {
                formData.append('_method', 'PATCH');
            }

            const response = isEdit
                ? await updateTransaction({id: editItem.id, data: formData, orgCode}).unwrap()
                : await createTransaction({data: formData, orgCode}).unwrap();

            showSnackbar(response.message || `Transaction ${isEdit ? 'updated' : 'submitted'} successfully.`, 'success');
            navigation.goBack();
        } catch (error: any) {
            const apiMessage =
                error?.data?.message || `Unable to ${isEdit ? 'update' : 'submit'} the transaction right now.`;
            setErrors(prev => ({...prev, general: apiMessage}));
            showSnackbar(apiMessage, 'error');
        }
    };

    return {
        isEdit,
        type,
        date,
        showDatePicker,
        referenceNo,
        paymentMode,
        transactionId,
        personName,
        amount,
        remarks,
        document,
        errors,
        isLoading,
        personLabel,
        personPlaceholder,
        amountHint,
        amountValue,
        showUploadChoice,
        setShowUploadChoice,
        setShowDatePicker,
        setReferenceNo,
        setTransactionId,
        setPersonName,
        setAmount,
        setRemarks,
        pickDocument,
        capturePhoto,
        pickImage,
        clearDocument,
        updateFieldError,
        handleDateChange,
        handleTypeChange,
        handlePaymentModeChange,
        onSubmit,
    };
};

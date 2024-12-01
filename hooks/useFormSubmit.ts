/**
 * useFormSubmit Hook
 *
 * This hook abstracts the form submission logic, allowing you to reuse it across different forms and components.
 * It takes in a `serverAction` function (which handles the communication with your server) and a `clearForm` function
 * (which resets the form fields after a successful submission).
 *
 * @param {Function} serverAction - The function that performs the server-side operation, such as creating or updating data.
 * @param {Function} clearForm - A function to clear or reset the form fields after a successful submission.
 *
 * handleSubmit Function
 *
 * This function handles the entire form submission process. It does the following:
 * - Creates a FormData object to hold the form's data.
 * - Executes the serverAction function, passing in the FormData.
 * - Handles the response, including displaying toast notifications for success or error.
 * - Calls the clearForm function to reset the form fields if the submission is successful.
 *
 * @param {Object} formDataObj - An object where the keys correspond to the form field names and the values are the respective form field values.
 * This allows dynamic creation of FormData, making it flexible for different forms.
 *
 * Reusable Components
 *
 * By using this hook, you can avoid repetitive form submission logic in your components. It makes your codebase cleaner,
 * more maintainable, and reduces the risk of errors due to duplicated logic. This is particularly useful when you have multiple forms
 * with similar submission workflows, like creating or updating tickets, events, users, etc.
 *
 * When you call useFormSubmit and pass it the necessary arguments (like your server action function and a form clearing function), it returns a handleSubmit function that is pre-configured to handle form submissions based on the logic defined within the hook.
 *
 *
 *
 */

import { useState } from 'react';
import toast from 'react-hot-toast';

const useFormSubmit = (
    serverAction: (formData: FormData) => Promise<any>,
    clearForm: () => void
) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: { preventDefault: () => void },
        formDataObj: Record<string, any>
    ) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(formDataObj).forEach((key) => {
            formData.append(key, formDataObj[key]);
        });

        try {
            const response = await serverAction(formData);

            if (response.success) {
                toast.success('Operation successful!');
                clearForm(); // Clear form fields if needed
            } else {
                toast.error('Failed: ' + response.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading };
};

export default useFormSubmit;

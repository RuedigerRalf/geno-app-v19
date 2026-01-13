import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class EmailValidator {

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): null | ValidationErrors => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }

            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);

            // if true, return no error (null), else return error passed in the second parameter
            return valid ? null : error;
        };
    }

    static emailMatchValidator(control: AbstractControl) {
        // get email from our email form control
        const email: string = control.get('email')?.value;
        // get confirmEmail from our confirmEmail form control
        const confirmEmail: string = control.get('confirmMail')?.value;
        // compare if the email matches
        if (email !== confirmEmail) {
            // if they don't match, set an error in our confirmEmail form control
            control.get('confirmMail')?.setErrors({ NoEmailMatch: true });
        }
    }

}
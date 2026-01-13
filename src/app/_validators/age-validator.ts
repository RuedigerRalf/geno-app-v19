import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ageValidator(minAge: number): ValidatorFn {

    return (con: AbstractControl): { [key: string]: boolean } | null => {

        let dateValue = new Date(con.value);
        if (!dateValue) {
            return { 'ageValidator': true };
        }

        let dt = new Date();
        var diff = dt.getTime() - new Date(con.value).getTime();
        let age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

        if (age < minAge) {
            return { 'ageValidator': true };
        } else {
            return null;
        }
    }
}
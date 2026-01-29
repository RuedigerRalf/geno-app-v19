import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LogedUser } from '../_interface/User';
import { RegisterDto } from '../_interface/Register';

import { ChangePasswordDto } from '../_interface/ChangePasswordDto';
import { ConfirmterminateMembershipDto } from '../_interface/confirmterminate-membership-dto';
import { ConfirmRegistrationDto } from '../_interface/confirm-registration-dto';
import { ConfirmNewEmailDto } from '../_interface/confirm-new-email-dto';
import { ChangeEmailRequestDto } from '../_interface/change-email-request-dto';
import { ForgotPasswordDto } from '../_interface/forgot-password-dto';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {

    // Login
    'Login User': props<{ username: string; password: string }>(),
    'Login User Success': props<{ logedUser: LogedUser }>(),
    'Login User Failure': props<{ error: any }>(),

    // Logout
    'Logout User': emptyProps(),
    'Logout User Silent': emptyProps(),
    
    // Register Single User
    'Register User': props<{ registerDto: RegisterDto }>(),
    'Register User Success': emptyProps(),
    'Register User Failure': props<{ error: any }>(),
   
    // Confirm Registration
    'Confirm Registration': props<{ confirmRegistrationDto: ConfirmRegistrationDto }>(),
    'Confirm Registration Success': emptyProps(),
    'Confirm Registration Failure': props<{ error: any }>(),
    
    // Cancel Register
    'Return to homepage': emptyProps(),

    // change email
    'Change Email': props<{ changeEmailRequestDto: ChangeEmailRequestDto }>(),
    'Change Email Success': emptyProps(),
    'Change Email Failure': props<{ error: any }>(),

    // Confirm new Mail
    'Confirm New Mail': props<{ confirmNewEmailDto: ConfirmNewEmailDto}>(),
    'Confirm New Mail with Logout': emptyProps(),
    'Confirm New Mail Failure': props<{ error: any }>(),

    // Forgot Password
    'Forgot Password': props<{ forgotPasswordDto: ForgotPasswordDto }>(),
    'Forgot Password Success': emptyProps(), 
    'Forgot Password Failure': props<{ error: any }>(),

    // Change Password
    'Change Password': props<{ changePasswordDto: ChangePasswordDto }>(),
    'Change Password With Logout': emptyProps(),
    'Change Password Failure': props<{ error: any }>(),

    // Terminate Membership
    'Terminate Memmbership': emptyProps(),
    'Terminate Memmbership Success': emptyProps(),
    'Terminate Memmbership Failure': props<{ error: any }>(),

    // Confirm termination
    'Confirm Terminate Memmbership': props<{ confirmterminateMembershipDto: ConfirmterminateMembershipDto }>(),
    'Confirm Terminate Memmbership with Logout': emptyProps(),
    'Confirm Terminate Memmbership Failure': props<{ error: any }>(),
}
});


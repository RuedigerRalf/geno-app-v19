import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LogedUser } from '../_interface/User';
import { RegisterDto } from '../_interface/Register';

import { ResetPasswordDto } from '../_interface/ResetPasswordDto';
import { ChangePasswordDto } from '../_interface/ChangePasswordDto';
import { ChangeEmailRequest, ConfirmNewEmailDto, ConfirmRegistrationDto, ConfirmterminateMembership } from '../_interface/auth-dto';

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
    'Change Email': props<{ changeEmailRequest: ChangeEmailRequest }>(),
    'Change Email Success': emptyProps(),
    'Change Email Failure': props<{ error: any }>(),

    // Confirm new Mail
    'Confirm New Mail': props<{ confirmNewEmailDto: ConfirmNewEmailDto}>(),
    'Confirm New Mail with Logout': emptyProps(),
    'Confirm New Mail Failure': props<{ error: any }>(),

    // Forgot Password
    'Forgot Password': props<{ forgotPasswordDto: ResetPasswordDto }>(),
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
    'Confirm Terminate Memmbership': props<{ confirmterminateMembership: ConfirmterminateMembership }>(),
    'Confirm Terminate Memmbership with Logout': emptyProps(),
    'Confirm Terminate Memmbership Failure': props<{ error: any }>(),
}
});


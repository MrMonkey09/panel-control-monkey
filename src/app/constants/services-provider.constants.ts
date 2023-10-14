import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from '../services/user-service.service';
import { ScreensService } from '../services/screens.service';

export class ServicesProvider {
  public cookieService!: CookieService;
  public scrn!: ScreensService;
  public userService!: UserServiceService;
}

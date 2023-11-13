import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from '../components/shared-module/services/user-service.service';
import { ScreensService } from '../components/shared-module/services/screens.service';

export class _ServicesProvider {
  public cookieService!: CookieService;
  public scrn!: ScreensService;
  public userService!: UserServiceService;
}

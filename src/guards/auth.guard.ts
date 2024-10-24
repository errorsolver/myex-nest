import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = ctx.switchToHttp().getRequest()
        return req.session.userId
    }
}
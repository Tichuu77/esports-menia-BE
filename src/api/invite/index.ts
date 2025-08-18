import { createRateLimiter } from "../apiRateLimiter";

export default (app) => {
   const inviteRateLimiter = createRateLimiter({
      max: 6,
      windowMs: 15 * 60 * 1000,
      message: 'errors.429',
    });
  app.post(
    `/tenant/:tenantId/invite`,
    inviteRateLimiter,
    require('./userInvite').default,
  );
  app.put(
    `/tenant/:tenantId/invite-remove`,
    require('./userInviteDistroy').default,
  );
    app.get(
    `/tenant/:tenantId/invites`,
    require('./userInvitesList').default,
  );
};

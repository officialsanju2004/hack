export const validate = (schema) => (req, _res, next) => {
const parsed = schema.safeParse(req.body);
if (!parsed.success) {
const err = new Error(parsed.error.issues.map((i) => ${i.path.join('.')}: ${i.message}).join('; '));
err.status = 422;
return next(err);
}
req.body = parsed.data;
next();
};

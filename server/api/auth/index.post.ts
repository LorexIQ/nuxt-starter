import users from "~/server/data/users";

export default defineEventHandler(async event => {
    const body = await readBody(event);

    if ((!body.login || body.login.length < 5) || (!body.password || body.password.length < 5))
        throw createError({
            statusCode: 400,
            statusMessage: 'login and password required'
        });

    const user = users.find(user => user.login === body.login);
    if (!user) throw createError({
        statusCode: 400,
        statusMessage: 'user is not found'
    });
    else if (user.password !== body.password) throw createError({
        statusCode: 400,
        statusMessage: 'password is wrong'
    });

    return {
        token: `${user.id}`
    };
});

import users from "~/server/data/users";

export default defineEventHandler(event => {
    const headers = getHeaders(event);
    const token = headers.authorization;

    if (!token || !token.includes('Bearer'))
        throw createError({
            statusCode: 401,
            statusMessage: 'Token is not sender or have wrong format'
        });

    const user = users.find(user => user.id === +token.split(' ')[1]);
    if (!user)
        throw createError({
            statusCode: 401,
            statusMessage: 'Token in wrong'
        });

    // @ts-ignore
    delete user.password;

    return user;
});

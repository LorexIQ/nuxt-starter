import users from "~/server/data/users";

export default defineEventHandler(async event => {
    const body = await readBody(event);

    if ((!body.login || body.login.length < 5) || (!body.password || body.password.length < 5) || (!body.name || body.name.length < 2))
        throw createError({
            statusCode: 400,
            statusMessage: 'login, name and password required'
        });

    let user = users.find(user => user.login === body.login);
    if (user) throw createError({
        statusCode: 400,
        statusMessage: 'login is busy'
    });

    user = {
        id: users.length ? users.at(-1)!.id + 1 : 0,
        login: body.login,
        name: body.name,
        password: body.password
    };

    users.push(user);

    return {
        token: `${user.id}`
    };
});

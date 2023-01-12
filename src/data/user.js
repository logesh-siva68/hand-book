const ret = require('bluebird/js/release/util')
const db = require('./postgres-db')
const ex = module.exports

ex.addUser = async (user) => {
    try {
        await db.any(
            `INSERT INTO hb_users (u_name, u_password,  u_email, eff_status, added_date,added_by,edited_date, edited_by) VALUES ($1,$2,$3, 'E', now(), 'SYS', now(), 'SYS')`,
            [user.name, user.password, user.email]
        )
        return
    } catch (err) {
        throw err
    }
}

ex.getUser = async (email) => {
    try {
        let user = await db.any(
            'SELECT u_id, u_email, u_password FROM hb_users WHERE u_email = $1',
            [email]
        )
        if (Array.isArray(user) && user.length) return user[0]
        else throw { message: 'user not found, please sing up' }
    } catch (err) {
        throw err
    }
}

ex.getUserById = async (u_id) => {
    try {
        let count = 0
        count = await db.one('SELECT count(*) FROM hb_users WHERE u_id = $1', [
            u_id,
        ])
        if (+count.count === 0) throw 'User not Found, invalid access'
        let user = await db.one(
            'SELECT u_id, u_email, u_password FROM hb_users WHERE u_id = $1',
            [u_id]
        )
        return user
    } catch (err) {
        throw err
    }
}

ex.getUserByEmail = async (email) => {
    try {
        let count = 0
        count = await db.one(
            'SELECT count(*) FROM hb_users WHERE u_email = $1',
            [email]
        )
        return +count.count
    } catch (err) {
        throw err
    }
}

ex.changePassword = async ({ email, password }) => {
    try {
        return await db.any(
            'UPDATE hb_users SET u_password = $1 WHERE u_email = $2',
            [password, email]
        )
    } catch (err) {
        throw err
    }
}

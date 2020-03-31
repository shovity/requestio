module.exports = (req, res, next) => {

    req.getParam = (key, defaultValue) => {
        const value = [req.body[key], req.query[key], req.params[key], defaultValue].find(v => v !== undefined)

        if (value === undefined) {
            // need throw exception to break api handle
            // express error will catch it
            throw `missing param ${key}`
        }

        return value
    }

    res.success = (data, option, code=200) => {
        const resopnse = {}

        if (!option) {
            option = {}
        }

        if (data) {
            resopnse.data = data
        }

        if (option.meta) {
            resopnse.meta = option.meta
        }

        res.status(code)
        res.json(resopnse)
    }

    res.error = (error, extra={}, code=400) => {
        res.status(code)
        res.json({
            error: error.message || error,
            url: req.originalUrl,
            method: req.method,
            ...extra,
        })
    }

    next()
}

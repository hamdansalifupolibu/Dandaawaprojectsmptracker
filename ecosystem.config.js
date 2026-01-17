module.exports = {
    apps: [{
        name: "mp-tracker",
        script: "./app.js",
        cwd: "./",
        env: {
            NODE_ENV: "production"
        },
        watch: false,
        max_memory_restart: '500M',
        restart_delay: 3000
    }]
}

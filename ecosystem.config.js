module.exports = {
    apps: [
        {
            name: 'groq-frontend-extract-pdf',
            script: 'npm',
            args: 'start',
            cwd: '/Users/daniel/Projects/groq-frontend-extract-pdf',
            env: {
                NODE_ENV: 'production',
                PORT: 30002,
            },
        },
    ],
}

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSentry from 'vite-plugin-sentry'

// Make process env available before Vite initiate
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, ".env.local")
});

const viteSentryConfig = {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: "perso-5q",
    project: "sentry-vue-school",
    release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
    setCommits: {
        auto: true,
    },
    sourceMaps: {
        include: ['./dist/assets'],
        ignore: ["node_modules"],
        urlPrefix: "~/assets"
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [vue(), viteSentry(viteSentryConfig)],
    build: {
        sourcemap: 'hidden'
    },
    define: {
        __SENTRY_RELEASE__: `"${process.env.npm_package_name}@${process.env.npm_package_version}"`
    }
});

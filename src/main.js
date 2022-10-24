import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/main.pcss"
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp(App)

Sentry.init({
    app,
    dsn: "https://691cce3317c042e8ad37f8583f98dd4b@o881075.ingest.sentry.io/4504037529944064",
    logErrors: true,
    release: __SENTRY_RELEASE__,
    environment: import.meta.env.MODE,
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in productionF
    tracesSampleRate: 1.0,
});

app.use(router)
    .mount('#app')

const user = {
    email: 'audrey.loiseau17@gmail.com'
}

Sentry.setUser(user)

// To unregister the user (eg: after a logout)
// Sentry.configureScope(scope => scope.setUser(null))
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    kcHtmlClass: "",
    kcBodyClass: "",
    kcFormGroupClass: "mb-4",
    kcLabelClass: "block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1",
    kcInputClass: "w-full px-3 py-2 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-600 transition-colors",
    kcInputErrorMessageClass: "text-[11px] text-rose-500 mt-1",
    kcButtonClass: "w-full py-2.5 px-4 rounded-md text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer",
    kcButtonPrimaryClass: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50",
    kcButtonDefaultClass: "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
    kcInputClassCheckbox: "flex items-center space-x-2 cursor-pointer",
    kcInputClassCheckboxInput: "w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-slate-900 cursor-pointer",
    kcInputClassCheckboxLabel: "text-xs text-slate-600 dark:text-slate-400 cursor-pointer",
    kcFormOptionsClass: "mt-4 text-center",
    kcFormOptionsWrapperClass: "text-xs text-slate-500 dark:text-slate-400"
} satisfies { [key in ClassKey]?: string };

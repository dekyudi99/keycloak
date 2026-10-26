import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "WEFGIS/Login",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithGoogleSocialLogin: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                social: {
                    displayInfo: true,
                    providers: [
                        {
                            loginUrl: "#google-sso",
                            alias: "google",
                            providerId: "google",
                            displayName: "Google"
                        }
                    ]
                }
            }}
        />
    )
};

export const WithInvalidCredentials: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: {
                    username: "john.doe@wefgis.com"
                },
                message: {
                    type: "error",
                    summary: "Invalid username or password."
                },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => {
                        const fieldNames = [fieldName, ...otherFieldNames];
                        return fieldNames.includes("username") || fieldNames.includes("password");
                    },
                    get: (fieldName: string) => {
                        if (fieldName === "username") return "Invalid username or email.";
                        if (fieldName === "password") return "Invalid password.";
                        return "";
                    },
                    exists: () => true
                }
            }}
        />
    )
};

export const WithoutRegistration: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationAllowed: false
                }
            }}
        />
    )
};

export const WithoutRememberMe: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    rememberMe: false
                }
            }}
        />
    )
};

import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "register.ftl" });

const meta = {
    title: "WEFGIS/Register",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithEmailAlreadyExists: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            value: "johndoe"
                        },
                        email: {
                            value: "john.doe@wefgis.com"
                        },
                        firstName: {
                            value: "John"
                        },
                        lastName: {
                            value: "Doe"
                        }
                    }
                },
                message: {
                    type: "error",
                    summary: "An account with this email address already exists."
                },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) =>
                        [fieldName, ...otherFieldNames].includes("email"),
                    get: (fieldName: string) =>
                        fieldName === "email" ? "Email already exists." : "",
                    exists: () => true
                }
            }}
        />
    )
};

export const WithTermsAndConditions: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                termsAcceptanceRequired: true
            }}
        />
    )
};


import { supabase } from "../services/supabaseClient.js";

const ADMIN_UID = "49342608-406a-4af8-a674-44f73a8e71f4";

export function setupAdminAuth() {
    const form = document.getElementById("admin-login-form");
    const emailInput = document.getElementById("admin-email");
    const passwordInput = document.getElementById("admin-password");
    const loginButton = document.getElementById("admin-login-button");
    const logoutButton = document.getElementById("admin-logout-button");
    const status = document.getElementById("admin-auth-status");

    // Stop if the login form is missing from index.html.
    if (
        !form ||
        !emailInput ||
        !passwordInput ||
        !loginButton ||
        !logoutButton ||
        !status
    ) {
        console.warn("Administrator login form was not found.");
        return;
    }

    function setStatus(message, type = "info") {
        status.textContent = message;
        status.style.color =
            type === "error"
                ? "#b91c1c"
                : type === "success"
                    ? "#15803d"
                    : "";
    }

    function setAdminUI(isAdmin) {
        loginButton.hidden = isAdmin;
        logoutButton.hidden = !isAdmin;

        emailInput.disabled = isAdmin;
        passwordInput.disabled = isAdmin;
    }

    // Restore the existing Supabase session after a page refresh.
    async function restoreSession() {
        try {
            const { data, error } = await supabase.auth.getSession();

            if (error) throw error;

            const user = data.session?.user;

            if (!user) {
                setAdminUI(false);
                setStatus("Not signed in.");
                return;
            }

            if (user.id === ADMIN_UID) {
                setAdminUI(true);
                setStatus("Administrator session restored.", "success");
            } else {
                await supabase.auth.signOut();
                setAdminUI(false);
                setStatus(
                    "This account is not authorized to manage campus data.",
                    "error"
                );
            }
        } catch (error) {
            setStatus(`Session error: ${error.message}`, "error");
        }
    }

    // Sign in with the email and password from Supabase Authentication.
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        loginButton.disabled = true;
        setStatus("Signing in...");

        try {
            const { data, error } =
                await supabase.auth.signInWithPassword({
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                });

            if (error) throw error;

            // Only the configured UID is accepted by this interface.
            if (data.user?.id !== ADMIN_UID) {
                await supabase.auth.signOut();
                setAdminUI(false);
                setStatus(
                    "Access denied. This account is not the administrator.",
                    "error"
                );
                return;
            }

            setAdminUI(true);
            passwordInput.value = "";

            setStatus(
                "Administrator signed in successfully.",
                "success"
            );
        } catch (error) {
            setStatus(`Sign-in failed: ${error.message}`, "error");
        } finally {
            loginButton.disabled = false;
        }
    });

    // Sign out from Supabase.
    logoutButton.addEventListener("click", async () => {
        logoutButton.disabled = true;

        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            form.reset();
            setAdminUI(false);
            setStatus("You have signed out.");
        } catch (error) {
            setStatus(`Sign-out failed: ${error.message}`, "error");
        } finally {
            logoutButton.disabled = false;
        }
    });

    restoreSession();
}

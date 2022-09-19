/**
 * Checks if session is still valid and if not,
 * logs the user out
 * 
 * @param {*} apiResponse Response from server
 * @returns to login page
 */
export async function destroySession(apiResponse) {
    if (apiResponse.data.message) {
        if (apiResponse.data.message === "Token has expired Login again to continue using the application") {
            const alert = document.createElement('ion-alert');
            alert.header = 'Session Expired';
            alert.subHeader = 'Your Session Has Expired';
            alert.message = 'Please login again.';
            alert.backdropDismiss = false;
            alert.buttons = [
                {
                    text: 'OK',
                    handler: () => {
                        localStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        window.location.replace("/login")
                        return;
                    }
                },
            ]

            document.body.appendChild(alert);
            await alert.present();
        }
        else {
            return;
        }
    } else {
        return;
    }
}
import { Controller } from "@hotwired/stimulus";
import axios from "axios";

export default class extends Controller {
    
    static targets = [ 'email', 'emailWrapper', 'invalidSvg','errorMessage', 'submit' ];
    connect() {
        this.submitTarget.addEventListener('click', ()=> {
            if((this.emailTarget.value === "") || (!this.emailTarget.value.includes("@")))  {
                this.emailWrapperTarget.classList.add("invalid-inset-input-text-field");
                this.emailWrapperTarget.classList.remove("focus-within:ring-1");
                this.emailWrapperTarget.classList.remove("focus-within:ring-indigo-600");
                this.emailWrapperTarget.classList.remove("focus-within:border");
                this.emailWrapperTarget.classList.remove("focus-within:border-black");
                this.errorMessageTarget.classList.remove("hidden");
                this.invalidSvgTarget.classList.remove("hidden");
                return;
            }

            else {
                // alert("Email sent to " + this.emailTarget.value);
                axios.get('/api/users_by_email', {
                    params: {
                        email: this.emailTarget.value
                    },
                    headers: {
                        Accept: "application/json"
                    }
                }).then((response) => {
                    Turbo.visit('/users/sign_in');
                }).catch((response) => {
                    Turbo.visit('/users/sign_up');
                })
            }
        });
    }
    submitForm() {
        this.submitTarget.click();
    }
}
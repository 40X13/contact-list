import Component from '../../../views/component.js';
import Contacts from "../../../api/contacts.js";

class AddList extends Component {
    constructor() {
        super();
        this.personalContacts = new Contacts();
        this.amount = this.request.params.amount || 10;
        this.page = this.request.params.page || 1;
    }

    async getData() {
        if (this.isAuth) {
            return await this.personalContacts.getContactList(this.page, this.amount);
        }
    }

    async render(contacts) {
        const pagesCount = Math.ceil(await this.personalContacts.getContactsCount() / this.amount);

        const pageNumbers = [];
        for (let i = 1; i <= pagesCount; i++) {
            pageNumbers.push(i);
        }

        return await (this.isAuth) ?
            `
                <h1 class="page-title">Contacts List</h1>
			    <div class="contacts">
			    
			        <div class="contacts__list">
                        ${contacts.map(contact => this.getContactHTML(contact)).join('\n ')}
                    </div>
                    
                    <div class="contacts__btn">
                        <button>delete</button>
                        <button>new</button>
                    </div>
						
				</div>

                <div class="page-element-count">
                    <a href="#/contacts?page=${this.page}&amount=10" 
                           class=${(+this.amount === 10) ? "active" : ''}
                    >
                        10
                    </a>/                  
                    <a href="#/contacts?page=${Math.ceil(this.page / 2)}&amount=20" 
                       class=${(+this.amount === 20) && "active"}
                    >
                        20
                    </a>
                </div>  
                <div class="pagination">
                    ${pageNumbers.map(pageNumber => this.getPaginationHTML(pageNumber)).join('\n ')}
                </div>
                
            `
            :
            ` 
                <h1 class="page-title">Contacts List</h1>
                <p>You are not authorized, please <a href="#/"> enter</a> in you account</p>
            `;
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const contactsContainer = document.getElementsByClassName('contacts')[0];

        contactsContainer.addEventListener('click', event => {
            const target = event.target;
            const targetClassList = target.classList;

            switch (true) {

                case targetClassList.contains('contact__checkbox'):
                    this.showControlButtons(target);

                    break;
            }
        });
    }

    getContactHTML(contact) {
        let {name, birth, address, company, _id} = contact;

        return `
                <div class="contact">
                    <input type="checkbox" class="contact__checkbox">
                    <div class="contact__data" >
                        <p>
                            <a href="">
                                ${name.firstName} ${name.surname} ${name.patronymic}
                            </a>
                        <p/>
                        <p>
                            ${birth}
                        <p/>
                        <p>
                            ${address.index} ${address.street} ${address.build} ${address.apartment} ${address.city} ${address.country}
                        <p/>
                        <p>
                            ${company}
                        <p/>
                
                    </div>
                    <div class="contact__btns hidden">
                       <button disabled>edit</button>
                       <button disabled>del</button>
                    </div> 
                </div>
        `;
    }

    getPaginationHTML(pageNumber) {
        return `
            <a href="#/contacts?page=${pageNumber.toString()}&amount=${this.amount}" 
               class=${(+this.page === pageNumber) ? "active" : ""}
             >
                ${pageNumber}
            </a>
        `;
    }

    showControlButtons(checkbox) {
        const contactBTNS = checkbox.parentElement.getElementsByClassName('contact__btns')[0];
        contactBTNS.classList.toggle('visible');
        for (const btn of contactBTNS.children) {
            btn.disabled = !checkbox.checked;
        }
    }

}

export default AddList;
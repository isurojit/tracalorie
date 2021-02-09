//Storage Controller
const StorageCtrl= (function() {
    return{
        storeItem: function(item){
            let items = [];
            //Check to see if there have any items in Local Storage
            if(localStorage.getItem('items') === null){
                items = [];
                //Push into Local storage
                items.push(item);
                //Set Localstorage
                localStorage.setItem('items', JSON.stringify(items));
            }else{
                //Get What is alreay in Local Storage
                items =JSON.parse(localStorage.getItem('items'));
                
                //Push new item
                items.push(item);

                //Reset LS
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            }else{
                items  = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) =>{
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });

            //Reset LS
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) =>{
                if(id === item.id){
                    items.splice(index, 1);
                }
            });

            //Reset LS
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();

//Item Controller
const ItemCtrl = (function() {
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
        // items: [
        //     // {id:0, name: 'Steak Dinner', calories:1200},
        //     // {id:1, name: 'Cookie', calories:600},
        //     // {id:2, name: 'Eggs', calories:200}
        // ]
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    //Public Method
    return{
        getItems: function(){
            return data.items
        },
        addItem: function(name, calories){
            let ID;
            // Create Id
            if(data.items.length >0){
                ID = data.items[data.items.length -1].id +1;
            }else{
                ID =0
            }
            //Calories to number
            calories = parseInt(calories);

            //Create new item
            newItem = new Item(ID, name, calories);

            //Add to items array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            //loop through the items
            data.items.forEach(item=>{
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories){
            //calories to number
            calories= parseInt(calories);

            let found = null;
            data.items.forEach(item=>{
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },
        deleteItem: function(id){
            //
            ids = data.items.map(function(item){
                return item.id;
            });

            //Get index
            const index= ids.indexOf(id);

            //remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;

            //Loop through items
            data.items.forEach((item)=>{
                total += item.calories;
            });
            
            //Set Total Calories in ds
            data.totalCalories = total;

            //return Total
            return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }
})();


//UI Controller
const UICtrl = (function() {
    const UISelectors ={
        itemList: '#item-list',
        listItems:'#item-list li',
        addBtn: '.add-btn',
        clearBtn: '.clear-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories',
    }
    //Public Method
    return{
        populateItemList :function(items){
            let outputHTML = '';
            items.forEach(item => {
                outputHTML += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil-alt"></i>
                    </a>
                </li>`;
            });

            //Insert List Into UI
            document.querySelector(UISelectors.itemList).innerHTML = outputHTML;
        },
        getItemInput: function(){
            return{
                name:document.querySelector(UISelectors.itemName).value,
                calories:document.querySelector(UISelectors.itemCalories).value
            }
        },
        addListItem: function(item){
            //Show The List
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //Create li Element
            const li = document.createElement('li');
            //Add class
            li.className = 'collection-item';
            //Add Id
            li.id = `item-${item.id}`;
            //Add HTML
            li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil-alt"></i>
            </a>`;
            //Append in parent
            document.querySelector(UISelectors.itemList).appendChild(li);

        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //convert node list into array
            listItems = Array.from(listItems);

            listItems.forEach( (listItem) =>{
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil-alt"></i>
                    </a>`;
                }
            });
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //Convert to array
            listItems = Array.from(listItems);

            listItems.forEach( listitem  =>{
                listitem.remove();
            });
        },
        clearInputs: function(){
            document.querySelector(UISelectors.itemName).value ='';
            document.querySelector(UISelectors.itemCalories).value ='';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemName).value =ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalories).value =ItemCtrl.getCurrentItem().calories;  
            UICtrl.showEditState();  
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(total){
            document.querySelector(UISelectors.totalCalories).textContent = total;
        },
        clearEditState: function(){
            UICtrl.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors : function(){
            return UISelectors;
        }
    }

})();



//App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    //Load Event Listners
    const loadEventListners = function(){
        //Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        //Add Item Events
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });
        
        //Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //Delete event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //Back Button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        //Clear all event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    //Functions
    //Add Items Submit
    const itemAddSubmit = (e)=>{
        //get From Input From Ui Controller
        const input = UICtrl.getItemInput();
        
        //Check For Name & Calories Input
        if(input.name !== '' && input.calories !== ''){
            //Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            //Add Items To UI
            UICtrl.addListItem(newItem);
            
            //get The total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Store in LS
            StorageCtrl.storeItem(newItem);

            //Clear the input fileds
            UICtrl.clearInputs();
        }else{
            if(input.name === ''){
                alert('Please Enter The Meal Name');
            }else{  
                alert('Please Enter The Calories Count');
            }
        }
        e.preventDefault();
    }

    //Click edit item
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            // Get list item id (item-0,  item-1)
            const listId = e.target.parentNode.parentNode.id;
            
            //break into an array
            const listIdArray = listId.split('-');

            //Get the actual id
            const id = parseInt(listIdArray[1]);

            //Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            //Set the current item
            ItemCtrl.setCurrentItem(itemToEdit);

            //Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    //item update submit function
    const itemUpdateSubmit= function(e){
        //Get item input
        const input = UICtrl.getItemInput();

        //Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        //Update UI
        UICtrl.updateListItem(updatedItem);

        //get The total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        //Clear edit state
        UICtrl.clearEditState();

        e.preventDefault();
    }

    //Item Delete submit function
    const itemDeleteSubmit = function(e){
        //get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //Delete from datastructure
        ItemCtrl.deleteItem(currentItem.id);

        //Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        //get The total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //Delete from Local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        //Clear edit state
        UICtrl.clearEditState();

        e.preventDefault();
    }

    //Clear all function
    const clearAllItemsClick = function(){
        //Delete all items from data sturcture
        ItemCtrl.clearAllItems();

        //Remove form Ui
        UICtrl.removeItems();

        //get The total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //clear from local storage
        StorageCtrl.clearItemsFromStorage();

        //Clear edit state
        UICtrl.clearEditState();

        //Hide the ul
        UICtrl.hideList();
    }

    //Public Methods
    return{
        init: function(){
            //Clean edit state /set initial state
            UICtrl.clearEditState();

            //fetch Items From Data Structure
            const items = ItemCtrl.getItems();
            
            //Check if any items
            if(items.length === 0){
                UICtrl.hideList();
            }else{
                //Populate List With Items
                UICtrl.populateItemList(items);
            }

            //get The total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Load Events
            loadEventListners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);


//Initiliaze App
App.init();
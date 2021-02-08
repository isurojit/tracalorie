//Storage Controller


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
        items: [
            // {id:0, name: 'Steak Dinner', calories:1200},
            // {id:1, name: 'Cookie', calories:600},
            // {id:2, name: 'Eggs', calories:200}
        ],
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
        addBtn: '.add-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories'
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
        clearInputs: function(){
            document.querySelector(UISelectors.itemName).value ='';
            document.querySelector(UISelectors.itemCalories).value ='';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(total){
            document.querySelector(UISelectors.totalCalories).textContent = total;
        },
        getSelectors : function(){
            return UISelectors;
        }
    }

})();



//App Controller
const App = (function(ItemCtrl, UICtrl) {
    //Load Event Listners
    const loadEventListners = function(){
        //Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        //Add Item Events
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
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

    //Public Methods
    return{
        init: function(){
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
})(ItemCtrl, UICtrl);


//Initiliaze App
App.init();
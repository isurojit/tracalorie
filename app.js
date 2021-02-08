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
            {id:0, name: 'Steak Dinner', calories:1200},
            {id:1, name: 'Cookie', calories:600},
            {id:2, name: 'Eggs', calories:200}
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
        itemCalories: '#item-calories'
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
            
        }else{

        }
        e.preventDefault();
    }

    //Public Methods
    return{
        init: function(){
            //fetch Items From Data Structure
            const items = ItemCtrl.getItems();
            
            //Populate List With Items
            UICtrl.populateItemList(items);

            //Load Events
            loadEventListners();
        }
    }
})(ItemCtrl, UICtrl);



//Initiliaze App
App.init();
//Storage Controller


//Item Controller
const ItemCtrl = (function() {
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        calories;
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
        logData: function(){
            return data;
        }
    }
})();



//UI Controller
const UICtrl = (function() {
    const UISelectors ={
        itemList: '#item-list'
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
        }   
    }
})();



//App Controller
const App = (function(ItemCtrl, UICtrl) {

    //Public Methods
    return{
        init: function(){
            //fetch Items From Data Structure
            const items = ItemCtrl.getItems();
            
            //Populate List With Items
            UICtrl.populateItemList(items);
        }
    }
})(ItemCtrl, UICtrl);



//Initiliaze App
App.init();
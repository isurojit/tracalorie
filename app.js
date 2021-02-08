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
        logData: function(){
            return data;
        }
    }
})();



//UI Controller
const UICtrl = (function() {

    //Public Method
    return{

    }
})();



//App Controller
const App = (function(ItemCtrl, UICtrl) {

    //Public Methods
    return{
        init: function(){
            console.log('Initilizing App..');
        }
    }
})(ItemCtrl, UICtrl);



//Initiliaze App
App.init();
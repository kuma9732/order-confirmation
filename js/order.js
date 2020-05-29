const firebaseConfig = {
    apiKey: "AIzaSyCCiNyYhoTM-8JDFoQnM_R7FfDIg61g6dQ",
    authDomain: "purchase-box.firebaseapp.com",
    databaseURL: "https://purchase-box.firebaseio.com",
    projectId: "purchase-box",
    storageBucket: "purchase-box.appspot.com",
  };
  
  firebase.initializeApp(firebaseConfig);

$(function(){
    const database = firebase.database();
      const orders = database.ref('orders/');

    /* --------------------------------
    * Orders From DB
    * -------------------------------- */
    orders.on('value', function success(data){
        if(data){
            let orders ='';
            $.each(data.val(),function(key,value){
                
                let order_company = value.company,
                 order_department = value.department,
                       order_name = value.name,
                       order_mail = value.mail,
                       order_tell = value.tell,
                      order_total = value.total,
                   total_products = value.products;

                orders += `<div class="order-text">
                                <div class="order-company">${order_company}</div>
                                <div class="order-department">${order_department}</div>
                                <div class="order-name">${order_name}</div>
                                <div class="order-mail">${order_mail}</div>
                                <div class="order-tell">${order_tell}</div>
                                </div>
                                <div class="order-details">
                                    <div class="order-total">合計金額 : ${order_total}円</div>`;
                    $.each(total_products, function(key,value){
                        orders += `<div>${value.size} / ${value.voltage} / ${value.capacitance}</div>
                                   <div>${value.price}</div>`
                    });

                orders += `</div>`;

            });

            $('.append-orders').html(orders);
        }
    });

    $(document).on('click', '.order-text', function(){

        $(this).next('.order-details').slideToggle();
    });
});


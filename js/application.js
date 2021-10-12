var updateSubTotal = function (ele) {

    var price = parseFloat($(ele).children('.price').text());
    var amount = parseFloat($(ele).children('.amount').children('input').val());

    var subTotal = price * amount;
    $(ele).children('.subTotal').html('$' + subTotal);
    return subTotal;

}

var sum = function (acc, x) {
    return acc + x;
  };

var updateTotal = function() {

    var subTotals = [];

    $('.itemRow').each(function (i, ele) {

        var subTotal = updateSubTotal(ele);
        subTotals.push(subTotal);

    });

    if (subTotals.length === 0) {

        $('#total').html('');

    } else {

        var total = subTotals.reduce(sum);
        $('#total').html('$' + total);

    }

}



$(document).ready(function () {

    $('.itemRow').each(function (i, ele) {
  
        updateSubTotal(ele);
    
    });

    updateTotal();

    $('#addItem').on('submit', function (event) {

        event.preventDefault();
    
        var item = $(this).children('[name=item]').val();
        var price = $(this).children('[name=price]').val();
    
        $('tbody tr').last().before('<tr class="itemRow">' +
    
          '<td class="item">' + item + '</td>' +
          '<td class="price">' + price + '</td>' +
          '<td class="amount"><input type="number" value="1" /></td>' +
          '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
          '<td class="subTotal"></td>' +
    
          '</tr>');

        $('.itemRow').each(function (i, ele) {
  
            updateSubTotal(ele);
        
        });

        updateTotal();

        $(this).children('[name=item]').val('');
        $(this).children('[name=price]').val('');
    
    });
  
});

var timeout;

$(document).on('input', 'tr input', function () {

  clearTimeout(timeout);

  timeout = setTimeout(function () {

    $('.itemRow').each(function (i, ele) {
  
        updateSubTotal(ele);
    
    });

    updateTotal();

  }, 500);

});

$(document).on('click', '.btn.remove', function (event) {

    $(this).closest('tr').remove();

    updateTotal();

});
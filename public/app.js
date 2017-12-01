var itemTemplate = $('#templates .item')
var list = $('#list')
// const baseURL = 'https://murmuring-beyond-21539.herokuapp.com/lists/1'
const baseURL = '/lists/1'
var loadRequest = $.ajax ({
  type: 'GET',
  url: baseURL + '/items'
})


loadRequest.done(function(data) {
  var itemsData = data
  itemsData.forEach((itemData) => {
    addItemToPage(itemData)
  })
})

function addItemToPage(itemData) {
  var item = itemTemplate.clone()
  item.attr('data-id', itemData.id)
  item.find('.description').text(itemData.description)
  if(itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
}

$('#add-form').on('submit', function(event) {
  var itemDescription = event.target.itemDescription.value
  var creationRequest = $.ajax ({
    type: 'POST',
    url: baseURL + '/items',
    data: {item: {description: itemDescription, completed: false}}
  })
  creationRequest.done(function(itemData) {
    addItemToPage(itemData)
  })
  event.preventDefault()
  event.target.reset()
})

list.on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
  var isItemCompleted = item.hasClass('completed')
  var itemID = item.attr('data-id')
  var updateRequest = $.ajax ({
    type: 'PUT',
    url: baseURL + '/items/' + itemID,
    data: {item:{ completed: !isItemCompleted }}
  })
  updateRequest.done(function(itemData) {
    if(itemData.completed) {
      item.addClass('completed')
    } else {
      item.removeClass('completed')
    }
  })
})

list.on('click', '.delete-button', function(event) {
  var item = $(event.target).parent()
  var itemID = item.attr('data-id')
  var deleteRequest = $.ajax ({
    type: 'DELETE',
    url: baseURL + '/items/' + itemID,
  })
  deleteRequest.done(function() {
    item.remove()
  })
})

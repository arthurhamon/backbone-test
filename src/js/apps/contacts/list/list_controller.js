define(["app", "apps/contacts/list/list_view"], function(ContactManager, View){
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
    List.Controller = {
      listContacts: function(criterion){
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading();
          ContactManager.mainRegion.show(loadingView);

          var fetchingContacts = ContactManager.request("contact:entities");

          var contactsListLayout = new View.Layout();
          var contactsListPanel = new View.Panel();

          require(["entities/common"], function(FilteredCollection){
            $.when(fetchingContacts).done(function(contacts){
              var filteredContacts = ContactManager.Entities.FilteredCollection({
                 collection: contacts,
                 filterFunction: function(filterCriterion){

                  if(filterCriterion.length > 0){
                    console.log('you should filter me', filterCriterion);
                    var criterion = filterCriterion.toLowerCase();
                    return function(contact){
                      for(key in contact.attributes){
                        var attr = contact.attributes[key];
                        if('string' == typeof attr){
                          
                          if(attr.toLowerCase().indexOf(filterCriterion) >= 0 ){
                            return contact;
                          }
                        }
                      }
                    }
                  }
                 }
               }); 

              if(criterion){
                filteredContacts.filter(criterion);
                contactsListPanel.once("show", function(){
                  contactsListPanel.triggerMethod("set:filter:criterion", criterion);
                });
              }

              var contactsListView = new View.Contacts({
                collection: filteredContacts
              });

              contactsListPanel.on("contacts:filter", function(filterCriterion){
                filteredContacts.filter(filterCriterion);
                ContactManager.trigger("contacts:filter", filterCriterion);
              });

              contactsListLayout.on("show", function(){
                contactsListLayout.panelRegion.show(contactsListPanel);
                contactsListLayout.contactsRegion.show(contactsListView);
              });

              contactsListPanel.on("contact:new", function(){
                  //TODO
                  require(["apps/contacts/new/new_view"], function (NewView){
                    var newContact = ContactManager.request("contact:entity:new");
                    var view = new NewView.Contact({
                      model : newContact
                    });

                    view.on("form:submit", function(data){
                      // avec le local storage
                      var id = _.max(localStorage.contacts);
                      // avec la collection
                      var idbis = contacts.max(function(c){ return c.id; }).get('id');
                      data.id = idbis+1;

                      newContact.save(data);

                      view.trigger('dialog:close');

                      contacts.add(data);
                    });

                    ContactManager.dialogRegion.show(view);
                  });
                  console.log('code to add a new contact');
              });

              contactsListView.on("itemview:contact:edit", function(childView, model){
                require(["apps/contacts/edit/edit_view"], function(EditView){
                  var view = new EditView.Contact({
                    model: model
                  });

                  view.on("form:submit", function(data){
                    console.log('I should save the data on the serve')
                  });

                  ContactManager.dialogRegion.show(view);
                });
              });

              contactsListView.on("itemview:contact:delete", function(childView, model){
                model.destroy();
              })

              ContactManager.mainRegion.show(contactsListLayout);
            });
          });
        });
      }
    }
  });

  return ContactManager.ContactsApp.List.Controller;
});

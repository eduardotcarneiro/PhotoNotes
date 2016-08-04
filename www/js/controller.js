angular.module('starter.controllers', [])
  .controller('listExampleCtrl', ['ListFactory', '$scope', '$ionicModal',
    function(ListFactory, $scope, $ionicModal) {

      // Load the add / change dialog from the given template URL
      $ionicModal.fromTemplateUrl('add-change-dialog.html', function(modal) {
        $scope.addDialog = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });

        //mostra a janela de alteração, criação e amostra
      $scope.showAddChangeDialog = function(action) {
          //cada funcção será baseada na ação
        $scope.action = action;
        $scope.addDialog.show();
      };

      $scope.leaveAddChangeDialog = function() {
        // Remove dialog 
        $scope.addDialog.remove();
        // Reload modal template to have cleared form
        $ionicModal.fromTemplateUrl('add-change-dialog.html', function(modal) {
          $scope.addDialog = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up'
        });
      };
      
      $scope.leftButtons = [];
      var addButton = {};
      addButton.type = "button-clear";
      addButton.content = '<i class="icon ion-ios7-plus-outline"></i>';
      addButton.tap = function(e) {
        $scope.showAddChangeDialog('add');
      }
      $scope.leftButtons.push(addButton);

      // Define os botões que aparecem após deslizar o item
      $scope.itemButtons = [{
        text: 'Deletar',
        type: 'button-assertive',
        onTap: function(item) {
          $scope.removeItem(item);
        }
      }, {
        text: 'Editar',
        type: 'button-calm',
        onTap: function(item) {
          $scope.showEditItem(item);
        }
      }];

      // Get list from storage
      $scope.list = ListFactory.getList();

      // Used to cache the empty form for Edit Dialog
      $scope.saveEmpty = function(form) {
        $scope.form = angular.copy(form);
      }
      
      //adicionar item
      $scope.addItem = function(form) {
        var newItem = {};
        // Add values from form to object
        newItem.title = form.title.$modelValue;
        newItem.description = form.description.$modelValue;
        newItem.srcImage = srcImage;
        
        // Save new list in scope and factory
        $scope.list.push(newItem);
        ListFactory.setList($scope.list);
        // Close dialog
        $scope.leaveAddChangeDialog();
      };

        //deleta item 
      $scope.removeItem = function(item) {
        // Search & Destroy item from list
        $scope.list.splice($scope.list.indexOf(item), 1);
        // Save list in factory
        ListFactory.setList($scope.list);
      }
      //abre para edição do item
      $scope.showEditItem = function(item) {

        // Remember edit item to change it later
        $scope.tmpEditItem = item;

        // Preset form values
        $scope.form.title.$setViewValue(item.title);
        $scope.form.description.$setViewValue(item.description);
        // Open dialog
        $scope.showAddChangeDialog('change');
      };
        
      //mostra item selecionado
      $scope.showItem = function(item) {

        // Remember edit item to change it later
        $scope.tmpEditItem = item;

        // Preset form values
        $scope.form.title.$setViewValue(item.title);
        $scope.form.description.$setViewValue(item.description);
        // Open dialog
        $scope.showAddChangeDialog('saw');
      };

        //edita o item
      $scope.editItem = function(form) {

        var item = {};
        item.title = form.title.$modelValue;
        item.description = form.description.$modelValue;

        var editIndex = ListFactory.getList().indexOf($scope.tmpEditItem);
        $scope.list[editIndex] = item;
        // Set first item to default
        
        ListFactory.setList($scope.list);
        
        $scope.leaveAddChangeDialog();
      }

    }
  ]);
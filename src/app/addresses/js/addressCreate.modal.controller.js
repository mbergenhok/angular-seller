angular.module('orderCloud')
    .controller('AddressCreateModalCtrl', AddressCreateModalController)
;

function AddressCreateModalController($uibModalInstance, $exceptionHandler, $scope, OrderCloud, OCGeography, SelectedBuyerID){
    var vm = this;
    vm.address = {
        Country: 'US' // this is to default 'create' addresses to the country US
    };
    vm.countries = OCGeography.Countries;
    vm.states = OCGeography.States;

    $scope.$watch(function() {
        return vm.address.Country
    }, function() {
        vm.address.State = null;
    });

    vm.submit = function() {
        vm.loading = OrderCloud.Addresses.Create(vm.address, SelectedBuyerID)
            .then(function(newAddress) {
                $uibModalInstance.close(newAddress);
            })
            .catch(function(ex) {
                $exceptionHandler(ex);
            })
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss();
    }
}
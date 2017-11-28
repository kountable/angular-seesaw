'use strict';
(function(angular, window) {
  return angular.module('ngSeesawLabs', []);
})(angular, window);

'use strict';
(function(angular) {
  return null;
})(angular);

'use strict';
(function() {
  var sslButtonDirective;
  sslButtonDirective = function() {
    return {
      templateUrl: 'modules/seesawlabs/views/directives/ssl-button.view.html',
      transclude: true,
      replace: true,
      link: {
        pre: function(scope, element, attrs) {
          var attributes;
          attributes = ['submit', 'button', 'reset'];
          if (!(attrs != null ? attrs.type : void 0)) {
            element.attr('type', 'button');
          }
          if (!attributes.includes(attrs.type)) {
            return attrs.type = 'button';
          }
        }
      }
    };
  };
  sslButtonDirective.$inject = [];
  return angular.module('ngSeesawLabs').directive('seesawButton', sslButtonDirective);
})();

'use strict';
(function() {
  var sslDatepickerDirective;
  sslDatepickerDirective = function($compile, seesawCommon) {
    return {
      replace: true,
      require: ['ngModel'],
      link: {
        pre: function(scope, element, attrs) {
          var attrsStr, template, templateEl;
          attrsStr = "";
          angular.forEach(Object.keys(attrs), function(val, key) {
            if (typeof attrs[val] === 'string') {
              return attrsStr += (seesawCommon.camelToDashHyphen(val)) + "=\"" + attrs[val] + "\" ";
            }
          });
          template = "<div class=\"ssl-datepicker\" ng-class=\"{ 'fg-line': true, 'fg-toggled': " + attrs.name + "Flag == true }\">\n  <input ng-click=\"" + attrs.name + "Flag = true;\" is-open=\"" + attrs.name + "Flag\" uib-datepicker-popup=\"MMM dd, yyyy\" show-weeks=\"false\" type=\"text\" close-text=\"Close\" " + attrsStr + " />\n</div>";
          templateEl = angular.element(template);
          return $compile(templateEl)(scope, function(clonedTemplate) {
            return element.replaceWith(clonedTemplate);
          });
        },
        post: function(scope, element, attrs, ctrls) {
          var ngModel;
          ngModel = ctrls[0];
          return ngModel.$formatters.push(function(modelValue) {
            var dt;
            if (!modelValue) {
              return void 0;
            }
            dt = new Date(modelValue);
            dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
            dt.setMinutes((dt.getMinutes() + (dt.getHours() * 60)) * -1);
            ngModel.$setViewValue(dt);
            return dt;
          });
        }
      }
    };
  };
  sslDatepickerDirective.$inject = ['$compile', 'seesawCommon'];
  return angular.module('ngSeesawLabs').directive('seesawDatepicker', sslDatepickerDirective);
})();

'use strict';
(function() {
  var sslFormDirective;
  sslFormDirective = function() {
    return {
      templateUrl: 'modules/seesawlabs/views/directives/ssl-form.view.html',
      transclude: true,
      replace: true,
      link: {
        pre: function(scope, element, attrs) {
          scope.parentForm = attrs.name;
          return element.on('submit', function(e) {
            var firstInvalid;
            firstInvalid = element[0].querySelector('.ng-invalid');
            if (firstInvalid) {
              e.stopImmediatePropagation();
              e.preventDefault();
              firstInvalid.focus();
              element.addClass('submitted');
            }
          });
        }
      }
    };
  };
  sslFormDirective.$inject = [];
  return angular.module('ngSeesawLabs').directive('seesawForm', sslFormDirective);
})();

'use strict';
(function() {
  var sslInputItemDirective;
  sslInputItemDirective = function() {
    return {
      templateUrl: 'modules/seesawlabs/views/directives/ssl-input-item.view.html',
      transclude: true,
      replace: true,
      scope: {
        label: '@',
        ref: '@',
        requiredMessage: '@',
        patternMessage: '@',
        minMessage: '@',
        maxMessage: '@',
        maxlengthMessage: '@',
        minlengthMessage: '@',
        emailMessage: '@',
        dateMessage: '@',
        numberMessage: '@'
      },
      link: {
        pre: function(scope, element, attrs) {
          scope.parentForm = scope.$parent[scope.$parent.parentForm];
          return scope.isEmpty = function(obj) {
            return !obj || Object.keys(obj).length === 0;
          };
        }
      }
    };
  };
  sslInputItemDirective.$inject = [];
  return angular.module('ngSeesawLabs').directive('seesawInputItem', sslInputItemDirective);
})();

'use strict';
(function() {
  var sslPictureDirective;
  sslPictureDirective = function() {
    return {
      templateUrl: 'modules/seesawlabs/views/directives/ssl-picture.view.html',
      replace: true,
      scope: {
        logoUrl: '=',
        logoUuid: '=',
        editMode: '=',
        defaultUrl: '@'
      },
      link: {
        pre: function(scope, element, attrs) {
          scope.editMode = false;
          return scope.removeLogo = function() {
            scope.logoUrl = null;
            return scope.logoUuid = '';
          };
        }
      }
    };
  };
  sslPictureDirective.$inject = [];
  return angular.module('ngSeesawLabs').directive('seesawPicture', sslPictureDirective);
})();

'use strict';
(function() {
  var sslStatusDirective;
  sslStatusDirective = function() {
    return {
      templateUrl: 'modules/seesawlabs/views/directives/ssl-status.view.html',
      replace: true,
      scope: {
        status: '=',
        label: '='
      },
      link: {
        pre: function(scope, element, attrs) {
          if (scope.status != null) {
            return scope.status = scope.status.toLowerCase();
          }
        }
      }
    };
  };
  sslStatusDirective.$inject = [];
  return angular.module('ngSeesawLabs').directive('seesawStatus', sslStatusDirective);
})();

'use strict';
(function(angular) {
  var seesawCommon;
  seesawCommon = function() {
    return {
      camelToDashHyphen: function(input) {
        var result;
        if (input.match(/_/g)) {
          input = input.replace(/_(.)/g, function(v, a) {
            return a.toUpperCase();
          });
        }
        if (input.match(/^[A-Z]+$/g)) {
          input = input.toLowerCase();
        }
        result = input.replace(/([A-Z])/g, '-$1');
        return result.toLowerCase();
      }
    };
  };
  seesawCommon.$inject = [];
  return angular.module('ngSeesawLabs').factory('seesawCommon', seesawCommon);
})(angular);

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
  sslButtonDirective = function($compile, seesawCommon) {
    return {
      transclude: true,
      replace: true,
      link: function(scope, element, attrs, ctrl, transclude) {
        var attributes, attrsStr, template, templateEl;
        attributes = ['submit', 'button', 'reset'];
        attrsStr = "";
        attrs['type'] = attrs.type || 'button';
        if (!attributes.includes(attrs.type)) {
          attrs['type'] = 'button';
        }
        if (attrs['type'] === 'submit') {
          attrs['ngClick'] = "onSubmit()";
        }
        angular.forEach(Object.keys(attrs), function(val, key) {
          if (typeof attrs[val] === 'string') {
            return attrsStr += (seesawCommon.camelToDashHyphen(val)) + "=\"" + attrs[val] + "\" ";
          }
        });
        template = "<button " + attrsStr + " class=\"ssl-button\">\n  <placeholder></placeholder>\n</button>";
        templateEl = angular.element(template);
        transclude(scope, function(clonedContent) {
          templateEl.find("placeholder").replaceWith(clonedContent);
          return $compile(templateEl)(scope, function(clonedTemplate) {
            return element.replaceWith(clonedTemplate);
          });
        });
        return scope.onSubmit = function() {
          return scope.$parent[scope.$parent.parentForm].$submitted = true;
        };
      }
    };
  };
  sslButtonDirective.$inject = ['$compile', 'seesawCommon'];
  return angular.module('ngSeesawLabs').directive('seesawButton', sslButtonDirective);
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
              return firstInvalid.focus();
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
        ref: '@'
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

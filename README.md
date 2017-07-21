# Exercise From JUPL

# Instructions

To run the unit tests in Karma, you need to make the following changes.

Modify systemjs.config.js, from 
```sh
paths: {
  'npm:': '/node_modules/'
}
```
to
```sh
paths: {
  'npm:': '/base/node_modules/'
}
```

Modify app.component.ts, from 
```sh
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [RuntimeSettingsService]
})
```
to
```sh
@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [RuntimeSettingsService]
})
```
	
And then you can run the command on the root folder to start Karma:
```sh
npm test
```

As shown below:


![N|Solid](https://zlxadhkust.files.wordpress.com/2017/07/002.png)


# References

### Get Started

https://angular.io/guide/visual-studio-2015
https://stackoverflow.com/questions/44793859/rxjs-subject-d-ts-error-class-subjectt-incorrectly-extends-base-class-obs
https://johnpapa.net/angular-2-styles/

### Hero Example:
https://angular.io/tutorial/toh-pt1
https://angular.io/tutorial/toh-pt6

https://stackoverflow.com/questions/36803389/angular2-async-pipe-not-does-not-fill-object-data-into-template
https://stackoverflow.com/questions/34363161/angular-2-displaying-async-object-data-from-promise
https://stackoverflow.com/questions/34980973/how-to-bind-a-promise-to-a-component-property
https://stackoverflow.com/questions/41453663/how-to-bind-dynamically-created-form-fields-to-an-object-in-angular-2
https://stackoverflow.com/questions/34464108/angular2-set-headers-for-every-request
https://stackoverflow.com/questions/39776591/angular2-global-configuration-file
https://stackoverflow.com/questions/35163009/angular-2-show-and-hide-an-element
https://stackoverflow.com/questions/40214655/angular-2-checkbox-two-way-data-binding
https://stackoverflow.com/questions/36366375/onchange-equivalent-in-angular2

### form

https://stackoverflow.com/questions/35941902/how-to-bind-form-input-to-object
https://stackoverflow.com/questions/40207746/angular-2-form-with-array-of-object-inputs
https://stackoverflow.com/questions/37831440/angular-2-using-template-reference-variable-ngform-as-input-binding

### observable
https://stackoverflow.com/questions/35018916/angular-2-interpolation-and-binding-with-async-http-request
https://stackoverflow.com/questions/34840969/cannot-find-a-differ-supporting-object-async-pipe-and-ngfor-problems-in-angular?rq=1

### Unit Test
https://angular.io/guide/testing
https://angular.io/generated/live-examples/testing/app-specs.eplnkr.html
https://taco.visualstudio.com/en-us/docs/unit-test-03-basic-testing/
https://stackoverflow.com/questions/39406220/how-to-do-a-unit-test-for-http-post-put-delete-using-mockbackend-in-angular2
http://angularfirst.com/getting-started-with-npm-in-visual-studio/
https://stackoverflow.com/questions/39406220/how-to-do-a-unit-test-for-http-post-put-delete-using-mockbackend-in-angular2
https://semaphoreci.com/community/tutorials/testing-angular-2-http-services-with-jasmine
http://www.c-sharpcorner.com/article/how-to-perform-unit-test-using-jasmine-in-angular-2-day-282/
https://stackoverflow.com/questions/17469928/how-to-use-multiple-expect-in-jasmine
https://stackoverflow.com/questions/40373099/angular2-quickstart-tutorial-breaking-karma-tests-cant-bind-to-ngmodel-sin
https://stackoverflow.com/questions/40086629/error-no-provider-for-httpservice-in-karma-test
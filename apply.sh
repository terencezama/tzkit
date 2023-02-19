nx run demo-angular:clean
# # nx run demo-angular:ios  > /dev/null
cd apps/demo-angular
ns typings ios
cd ../../

mv 'apps/demo-angular/typings/ios/x86_64/objc!nsswiftsupport.d.ts' 'packages/idscanner/typings/ios/objc!nsswiftsupport.d.ts'
rm -rf apps/demo-angular/typings
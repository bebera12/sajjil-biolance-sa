# دليل نشر تطبيق سجّل على App Store

> هذا الدليل يفترض أنك على ماك بوك برو، وأن المشروع مرتبط بـ GitHub.

## 0. متطلبات مرة واحدة

```bash
# Xcode من Mac App Store (إجباري)
# Node.js
brew install node
# CocoaPods (يحتاجه Capacitor لـ iOS)
sudo gem install cocoapods
```

- حساب **Apple Developer** ($99/سنة): https://developer.apple.com/programs

## 1. سحب المشروع وتجهيزه

```bash
git clone <your-repo-url> sajjil
cd sajjil
npm install
```

## 2. إضافة منصة iOS (مرة واحدة فقط)

```bash
npm run build
npx cap add ios
npx cap sync ios
```

سيُنشأ مجلد `ios/` يحتوي على مشروع Xcode.

> ✅ Privacy Manifest موجود في `ios/App/App/PrivacyInfo.xcprivacy`. تأكّد أنه مضاف في Xcode → اسحبه من Finder إلى Project Navigator في Xcode (داخل مجلد App) واختر "Create folder reference".

## 3. فتح المشروع في Xcode

```bash
npx cap open ios
```

### إعدادات يجب ضبطها داخل Xcode:

**General → Identity:**
- Display Name: `سجّل`
- Bundle ID: `app.biolance.sajjil`
- Version: `1.0.0`، Build: `1`

**Signing & Capabilities:**
- ✅ Automatically manage signing
- Team: اختر فريقك (Apple Developer Account)

**Deployment Info:**
- iOS 14.0 minimum
- Portrait فقط
- iPhone (+ iPad اختياري)

**Info.plist:** افتحه وأضف (إن لم يكن موجوداً):
```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <false/>
</dict>
<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>
```

## 4. الأيقونة و Splash Screen

1. جهّز صورة 1024×1024 PNG (شعار Biolance على خلفية #12332A) واحفظها كـ `resources/icon.png`.
2. جهّز صورة 2732×2732 PNG للـ splash واحفظها كـ `resources/splash.png` (الشعار في المنتصف).
3. ثبّت ووَلِّد الأصول:

```bash
npm i -D @capacitor/assets
npx capacitor-assets generate --ios
npx cap sync ios
```

## 5. الاختبار

```bash
# Simulator
npx cap run ios

# أو افتح Xcode واختر iPhone 15 Pro ثم Run (▶)
```

اختبر على iPhone حقيقي: وصّله بكابل، اختر الجهاز من القائمة العلوية، Run.

## 6. الرفع للـ App Store

في Xcode:
1. اختر **Any iOS Device (arm64)** من القائمة العلوية.
2. **Product → Archive** (انتظر 2-5 دقائق).
3. عند انتهاء الـ Archive يفتح **Organizer** → اضغط **Distribute App**.
4. **App Store Connect → Upload → Next → Next → Upload**.
5. ستصل رسالة من Apple خلال 10-30 دقيقة بأن الـ Build جاهز.

## 7. App Store Connect

اذهب إلى https://appstoreconnect.apple.com → My Apps → +.

### أهم النقاط:
- **App Privacy** (إجباري): أعلن أنك تجمع "Name" و "Email Address" لـ "App Functionality"، **بدون tracking**، **غير مرتبطة بهوية المستخدم**.
- **Privacy Policy URL**: `https://<نطاقك>/privacy` (الصفحة جاهزة في التطبيق).
- **Support URL**: `https://<نطاقك>/contact`.
- **Category**: Business (Primary) + Medical (Secondary).
- **Age Rating**: 4+.
- **Screenshots**: لقطات بدقة 1290×2796 (iPhone 6.7") من المحاكي:
  ```bash
  # داخل المحاكي: Cmd+S لحفظ screenshot
  ```

## 8. التحديثات المستقبلية

```bash
git pull
npm install
npm run build
npx cap sync ios
```
ثم في Xcode: زِد Build (1 → 2)، Archive، Upload.

## 9. سياسات Apple — checklist قبل Submit

- [ ] كل الروابط الداخلية تشتغل
- [ ] الأيقونة و Splash يظهرون
- [ ] Privacy Manifest مدرج
- [ ] Privacy Policy URL يفتح
- [ ] لا يستخدم HTTP غير مشفّر
- [ ] safe-area سليم على iPhone بنوتش
- [ ] الـ keyboard لا يُغطّي حقول الإدخال
- [ ] لا يوجد محتوى placeholder أو روابط مكسورة

---
**ملاحظة dev hot-reload**: إذا أردت اختبار التطبيق على الجهاز مع تحميل مباشر من Lovable (أثناء التطوير فقط، لا للنشر):
```bash
CAP_DEV=1 npx cap sync ios
```
ثم في Xcode، Run. **قبل الـ Archive للنشر**: `npx cap sync ios` بدون `CAP_DEV` ليرجع للوضع الإنتاجي.

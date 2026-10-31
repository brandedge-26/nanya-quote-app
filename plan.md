# NANYA CNC Quotation App — Proposal

## Abhi Problem Kya Hai?

Sales team har customer ke liye quotation banane ke liye `QUOTATION APPS FORMATS.xlsx` wali Excel file manually use karti hai. Is tareeke me ye dikkatein hain:

- **Time waste hota hai** — har naye customer ke liye Excel copy karni padti hai, sahi model ki sheet dhundhni padti hai, fields manually fill karni padti hain.
- **Galti hone ka risk** — price manually calculate/type karne me insaani galti ho sakti hai.
- **Koi record/history nahi** — kisko, kab, kya quotation diya tha — ye track karna mushkil hai.
- **Har banda apne tareeke se banata hai** — alag sales log quotations banate hain to format/consistency alag ho sakti hai.
- **Prices time ke saath badalti rehti hain** (kabhi badhti hain, kabhi kam hoti hain) — lekin Excel me ye price saari **7 alag sheets** me manually likhi hui hai. Jab bhi rate change ho, har sheet me jaake alag-alag update karna padta hai — isme galti ka bohot chance hai (ho sakta hai ek sheet update ho jaye, dusri reh jaye, aur purani/galat price chali jaye).
- **Sirf ek computer tak limited** — kahin aur se kaam nahi ho sakta, customer khud bhi apni quotation nahi bana sakta.

---

## Hum Kya Bana Rahe Hain?

Ek **online system** jisme 3 tarah ke log kaam karenge:

### 1. Customer
- Khud apni pasand ka machine model select kar sake, chahi hui accessories tick kar sake, aur apni khud ki quotation (PDF) bana sake — bina sales team se contact kiye.

### 2. Sales (Company ka Banda)
- Har sales person apna **apna login** istemal karega.
- Customer ki taraf se bhi quotation bana sakega (jab customer call/visit kare).
- Jo bhi quotation banayega, uske naam ke saath record me save hogi — pata chalega kis sales person ne kya quote kiya.

### 3. Admin
- **Sirf Admin hi machine aur accessories ke prices change kar sakega.**
- Jab bhi company rate badhaye ya ghataye, Admin ek hi jagah se price update karega — aur wo naya price turant **har jagah** (customer ko, sales ko) automatically dikhne lag jayega.
- Kisi ko bhi 7 alag jagah jaake manually price change nahi karna padega.
- Admin ye bhi dekh sakega ke total kitni quotations bani hain, kisne banayi.

---

## Isse Company Ko Kya Faida Hoga?

| Faida | Kaise |
|---|---|
| **Time bachega** | Quotation minutes me ban jayegi |
| **Galtiyan kam hongi** | Price automatic calculate hoga, manually likhne ki zaroorat nahi |
| **Price hamesha sahi/updated rahegi** | Admin ek jagah se price change karega, sab jagah khud update ho jayegi — purani/galat price jaane ka chance khatam |
| **Customer khud bhi use kar sakega** | Customer ko sales team ka wait nahi karna padega, khud quotation bana sakega |
| **Poora record mojood rahega** | Kisne, kisko, kab, kya quote kiya — sab track ho sakega |
| **Professional image** | Har quotation same, saaf-suthre format me jayegi |

---

## Scope (Is App Me Kya Shamil Hoga)

- Company ke saare 7 machine models (NANO-X8, NANO-X10, NV-855, NV-1165, NV-1270, NV-1470, NV-1670)
- Saari optional accessories (chain conveyor, tool probe, CTS system, 4th axis rotary table, packing, optical scale)
- Wahi Terms & Conditions, warranty, payment terms jo abhi quotation me likhi jaati hain
- NANYA CNC ka logo aur har machine ki photo
- Admin ke liye price management (machine prices + accessories prices kabhi bhi update kar sakta hai)
- 3 alag roles: Customer, Sales, Admin — har ek ko utni hi cheez dikhegi jo uske kaam ki hai

---

## Manager Se Decisions Chahiye

1. **Customer ko login chahiye ya bina login ke seedha khul jaye?**
   - Agar login hoga, to customer ki apni purani quotations bhi save/track ho sakengi.
   - Agar login nahi hoga, to koi bhi link khol ke turant quotation bana sakega, lekin uski history track nahi hogi.

2. **Sales aur Admin ke liye login zaroor hoga** (kyunki price change karna aur customer records dekhna sensitive kaam hai) — isme koi do-rai nahi, bas confirm kar dena.

Ye decisions confirm hone ke baad hi aage ka kaam shuru hoga.

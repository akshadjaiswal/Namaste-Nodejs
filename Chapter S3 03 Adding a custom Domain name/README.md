# DevTinder - Mapping a Domain Name to Deployed App 🌐 (Half)

## 📌 Code Demonstration Links  
🔗 **Backend Repository:** [DevTinder Backend](https://github.com/akshadjaiswal/devTinder-backend)  
🔗 **Frontend Repository:** [DevTinder Frontend](https://github.com/akshadjaiswal/devTinder-frontend)  

---

## 📌 Overview  
This document outlines the process of mapping a **custom domain name** to the deployed DevTinder app using services like **GoDaddy** and **Cloudflare**. Connecting a domain improves professionalism and makes the app easily accessible.

---

## ✅ Steps Completed

### **1️⃣ Purchase a Domain Name**
- Bought a domain through **GoDaddy** (or any other domain provider).
- Ensured access to the domain settings from the provider dashboard.

### **2️⃣ Access DNS Management in GoDaddy**
- Navigated to **My Products > DNS Management** in the GoDaddy dashboard.
- Located the domain to configure DNS records.

### **3️⃣ Set Up DNS via Cloudflare**
- Created a Cloudflare account (or logged in if existing).
- Added the purchased domain to Cloudflare.
- Allowed Cloudflare to scan existing DNS records.
- Prepared to manage the DNS setup (A records, CNAME, etc.) from Cloudflare.

### **4️⃣ Update Name Servers in GoDaddy**
- Cloudflare provided **new name servers** (e.g., `joel.ns.cloudflare.com`).
- Replaced GoDaddy’s default name servers with those provided by Cloudflare.
- Saved changes and waited for DNS propagation (may take a few minutes to a few hours).

---

## 🎯 Next Steps
- Add A or CNAME records in Cloudflare to point to the EC2 public IP.
- Set up HTTPS using **Cloudflare SSL** or Let's Encrypt.
- Update Nginx configuration to handle the custom domain.
- Redirect traffic from **www to non-www** or vice versa.
- Test the domain to ensure it loads the DevTinder app successfully.

---

## 🔥 Conclusion  
Domain mapping is now in progress using **Cloudflare and GoDaddy**. This step is essential for making DevTinder publicly available through a branded URL. The next focus will be on DNS record configuration and secure HTTPS setup. still some steps to do🌐🚀

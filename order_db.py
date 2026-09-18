from datetime import datetime, timedelta
import random
from typing import Optional

def _date_ago(days: int) -> str:
    date = datetime.now() - timedelta(days=days)
    return date.isoformat()

# Orders data
ORDERS = {
    # Cars
    "ORD-2025-101": {
        "order_id": "ORD-2025-101", "product_id": "PRD-101", "product_name": "Tesla Model 3", "category": "Cars", "price": 42990.0, "customer_name": "Alice Smith", "customer_email": "alice@example.com", "days_since_purchase": 15
    },
    "ORD-2025-102": {
        "order_id": "ORD-2025-102", "product_id": "PRD-102", "product_name": "BMW M4", "category": "Cars", "price": 74900.0, "customer_name": "Bob Jones", "customer_email": "bob@example.com", "days_since_purchase": 45
    },
    "ORD-2025-103": {
        "order_id": "ORD-2025-103", "product_id": "PRD-103", "product_name": "Porsche 911", "category": "Cars", "price": 116950.0, "customer_name": "Charlie Brown", "customer_email": "charlie@example.com", "days_since_purchase": 120
    },
    # Bikes
    "ORD-2025-201": {
        "order_id": "ORD-2025-201", "product_id": "PRD-201", "product_name": "Ducati Panigale", "category": "Bikes", "price": 28395.0, "customer_name": "Diana Prince", "customer_email": "diana@example.com", "days_since_purchase": 10
    },
    "ORD-2025-202": {
        "order_id": "ORD-2025-202", "product_id": "PRD-202", "product_name": "Kawasaki Ninja", "category": "Bikes", "price": 17399.0, "customer_name": "Evan Wright", "customer_email": "evan@example.com", "days_since_purchase": 30
    },
    "ORD-2025-203": {
        "order_id": "ORD-2025-203", "product_id": "PRD-203", "product_name": "Harley Sportster", "category": "Bikes", "price": 14499.0, "customer_name": "Fiona Gallagher", "customer_email": "fiona@example.com", "days_since_purchase": 95
    },
    # Mobile
    "ORD-2025-301": {
        "order_id": "ORD-2025-301", "product_id": "PRD-301", "product_name": "iPhone 15 Pro", "category": "Mobile", "price": 1199.0, "customer_name": "George Miller", "customer_email": "george@example.com", "days_since_purchase": 5
    },
    "ORD-2025-302": {
        "order_id": "ORD-2025-302", "product_id": "PRD-302", "product_name": "Galaxy S24", "category": "Mobile", "price": 1299.0, "customer_name": "Hannah Abbott", "customer_email": "hannah@example.com", "days_since_purchase": 60
    },
    "ORD-2025-303": {
        "order_id": "ORD-2025-303", "product_id": "PRD-303", "product_name": "Pixel 8 Pro", "category": "Mobile", "price": 999.0, "customer_name": "Ian Somerhalder", "customer_email": "ian@example.com", "days_since_purchase": 25
    },
    # Cup
    "ORD-2025-401": {
        "order_id": "ORD-2025-401", "product_id": "PRD-401", "product_name": "Ceramic Mug", "category": "Cup", "price": 35.0, "customer_name": "Jane Doe", "customer_email": "jane@example.com", "days_since_purchase": 8
    },
    "ORD-2025-402": {
        "order_id": "ORD-2025-402", "product_id": "PRD-402", "product_name": "Travel Cup", "category": "Cup", "price": 45.0, "customer_name": "Kevin Hart", "customer_email": "kevin@example.com", "days_since_purchase": 20
    },
    "ORD-2025-403": {
        "order_id": "ORD-2025-403", "product_id": "PRD-403", "product_name": "Tea Set", "category": "Cup", "price": 89.0, "customer_name": "Laura Palmer", "customer_email": "laura@example.com", "days_since_purchase": 15
    },
    # PS4
    "ORD-2025-501": {
        "order_id": "ORD-2025-501", "product_id": "PRD-501", "product_name": "PS4 Pro", "category": "PS4", "price": 399.0, "customer_name": "Mike Wheeler", "customer_email": "mike@example.com", "days_since_purchase": 12
    },
    "ORD-2025-502": {
        "order_id": "ORD-2025-502", "product_id": "PRD-502", "product_name": "DualShock 4", "category": "PS4", "price": 59.0, "customer_name": "Nancy Drew", "customer_email": "nancy@example.com", "days_since_purchase": 7
    },
    "ORD-2025-503": {
        "order_id": "ORD-2025-503", "product_id": "PRD-503", "product_name": "PSVR", "category": "PS4", "price": 299.0, "customer_name": "Oliver Queen", "customer_email": "oliver@example.com", "days_since_purchase": 88
    },
    # PS5
    "ORD-2025-601": {
        "order_id": "ORD-2025-601", "product_id": "PRD-601", "product_name": "PS5 Digital", "category": "PS5", "price": 449.0, "customer_name": "Peter Parker", "customer_email": "peter@example.com", "days_since_purchase": 22
    },
    "ORD-2025-602": {
        "order_id": "ORD-2025-602", "product_id": "PRD-602", "product_name": "DualSense Edge", "category": "PS5", "price": 199.0, "customer_name": "Quinn Fabray", "customer_email": "quinn@example.com", "days_since_purchase": 35
    },
    "ORD-2025-603": {
        "order_id": "ORD-2025-603", "product_id": "PRD-603", "product_name": "Pulse 3D", "category": "PS5", "price": 99.0, "customer_name": "Rachel Green", "customer_email": "rachel@example.com", "days_since_purchase": 3
    }
}

# Add calculated fields to orders
for order_id, order in ORDERS.items():
    order["purchase_date"] = _date_ago(order["days_since_purchase"])
    order["return_eligible"] = order["days_since_purchase"] <= 90

CUSTOMER_RETURN_HISTORY = {
    "charlie@example.com": ["RET-1", "RET-2", "RET-3"], # Serial returner
    "peter@example.com": ["RET-4"]
}

def get_order(order_id: str) -> Optional[dict]:
    return ORDERS.get(order_id)

def get_all_orders() -> list:
    return list(ORDERS.values())

def get_orders_by_category(category: str) -> list:
    return [o for o in ORDERS.values() if o["category"].lower() == category.lower()]

def get_customer_history(email: str) -> list:
    return CUSTOMER_RETURN_HISTORY.get(email, [])

def get_products_by_category(category: str) -> list:
    products = []
    seen = set()
    for o in ORDERS.values():
        if o["category"].lower() == category.lower() and o["product_id"] not in seen:
            seen.add(o["product_id"])
            products.append({
                "id": o["product_id"],
                "name": o["product_name"],
                "category": o["category"],
                "price": o["price"],
                "image_url": None
            })
    return products

def get_all_products() -> list:
    products = []
    seen = set()
    for o in ORDERS.values():
        if o["product_id"] not in seen:
            seen.add(o["product_id"])
            products.append({
                "id": o["product_id"],
                "name": o["product_name"],
                "category": o["category"],
                "price": o["price"],
                "image_url": None
            })
    return products

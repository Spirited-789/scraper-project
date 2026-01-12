import streamlit as st
import pandas as pd
import sqlite3
import plotly.express as px

DB_NAME = "market_data.db"

# ================= PAGE CONFIG =================
st.set_page_config(
    page_title="Market Analytics",
    layout="wide",
)

# ================= THEME (MATCH HOMEPAGE) =================
st.markdown("""
<style>
    .stApp {
        background-color: #000000;
        color: white;
    }

    h1, h2, h3 {
        color: #9bff00;
    }

    .stMetricValue {
        color: #9bff00;
        font-size: 28px;
    }

    .stMetricLabel {
        color: #a3a3a3;
    }

    section[data-testid="stSidebar"] {
        background-color: #0b0b0b;
        border-right: 1px solid #1f1f1f;
    }

    .insight {
        color: #a3a3a3;
        font-size: 14px;
        margin-top: 6px;
        line-height: 1.5;
    }
</style>
""", unsafe_allow_html=True)

# ================= UTILS =================
def format_big_number(num):
    if num >= 1e12:
        return f"${num/1e12:.2f}T"
    if num >= 1e9:
        return f"${num/1e9:.2f}B"
    if num >= 1e6:
        return f"${num/1e6:.2f}M"
    return f"${num:,.0f}"

# ================= LOAD DATA =================
@st.cache_data
def load_latest():
    conn = sqlite3.connect(DB_NAME)
    df = pd.read_sql("""
        SELECT *
        FROM market_snapshots
        WHERE timestamp = (SELECT MAX(timestamp) FROM market_snapshots)
    """, conn)
    conn.close()
    return df

df = load_latest()

if df.empty:
    st.warning("No data available. Ingest data first.")
    st.stop()

# ================= SIDEBAR =================
st.sidebar.title("🔍 Explore")

search = st.sidebar.text_input("Search coin")
top_n = st.sidebar.slider("Top N by Market Cap", 5, 50, 15)

metric = st.sidebar.selectbox(
    "Primary Metric",
    ["market_cap", "current_price", "total_volume", "price_change_pct_24h"]
)

show_raw = st.sidebar.checkbox("Show raw table")

# ================= FILTER DATA =================
df = df.sort_values("market_cap", ascending=False)

if search:
    df = df[
        df["name"].str.contains(search, case=False) |
        df["symbol"].str.contains(search, case=False)
    ]

df_top = df.head(top_n)

# ================= HEADER =================
st.markdown("## 📌 Market Overview")

c1, c2, c3, c4 = st.columns(4)

c1.metric("Total Market Cap", format_big_number(df["market_cap"].sum()))
c2.metric("Average Price", f"${df['current_price'].mean():,.2f}")
c3.metric("Top Asset", df.iloc[0]["name"])
c4.metric("Avg 24h Change", f"{df['price_change_pct_24h'].mean():.2f}%")

st.divider()

# ================= PRICE MOVEMENT =================
st.markdown("## 🚀 24h Price Movement")

price_fig = px.bar(
    df_top.sort_values("price_change_pct_24h"),
    x="price_change_pct_24h",
    y="name",
    orientation="h",
    color="price_change_pct_24h",
    color_continuous_scale=["#ff4d4d", "#9bff00"],
)

price_fig.update_layout(
    plot_bgcolor="#000000",
    paper_bgcolor="#000000",
    font_color="white",
)

st.plotly_chart(price_fig, use_container_width=True)

st.markdown("""
<div class="insight">
• Shows relative 24-hour price momentum across top assets.<br>
• Extreme movers often indicate short-term trading opportunities or news impact.
</div>
""", unsafe_allow_html=True)

# ================= PIE CHART =================
st.markdown("## 🧩 Metric Share (Top Assets)")

pie_fig = px.pie(
    df_top,
    names="name",
    values=metric,
    hole=0.5,
    color_discrete_sequence=px.colors.sequential.Greens
)

pie_fig.update_layout(
    plot_bgcolor="#000000",
    paper_bgcolor="#000000",
    font_color="white",
)

st.plotly_chart(pie_fig, use_container_width=True)

st.markdown("""
<div class="insight">
• Represents how the selected metric is distributed among leading assets.<br>
• Higher concentration suggests market dominance by fewer large players.
</div>
""", unsafe_allow_html=True)

# ================= MARKET CAP =================
st.markdown("## 💰 Market Cap Distribution")

cap_fig = px.treemap(
    df_top,
    path=["name"],
    values="market_cap",
    color="market_cap",
    color_continuous_scale="Greens",
)

cap_fig.update_layout(
    plot_bgcolor="#000000",
    paper_bgcolor="#000000",
    font_color="white",
)

st.plotly_chart(cap_fig, use_container_width=True)

st.markdown("""
<div class="insight">
• Visualizes relative market size and capital concentration.<br>
• Larger blocks indicate assets with systemic influence on the market.
</div>
""", unsafe_allow_html=True)

# ================= VOLATILITY =================
st.markdown("## ⚠️ Intraday Volatility")

df_top["volatility"] = df_top["high_24h"] - df_top["low_24h"]

vol_fig = px.bar(
    df_top.sort_values("volatility", ascending=False),
    x="name",
    y="volatility",
    color="volatility",
    color_continuous_scale="Oranges",
)

vol_fig.update_layout(
    plot_bgcolor="#000000",
    paper_bgcolor="#000000",
    font_color="white",
)

st.plotly_chart(vol_fig, use_container_width=True)

st.markdown("""
<div class="insight">
• Measures intraday price range as a proxy for short-term risk.<br>
• Assets with high volatility attract speculative and arbitrage activity.
</div>
""", unsafe_allow_html=True)

# ================= RAW DATA =================
if show_raw:
    st.markdown("## 📄 Raw Data")
    st.dataframe(df_top)

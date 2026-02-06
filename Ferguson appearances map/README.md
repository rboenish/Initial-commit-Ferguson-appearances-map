# Washington Governor Bob Ferguson Public Appearances Tracker

An interactive visualization of Governor Bob Ferguson's documented public appearances from January 2025 through February 2026.

## Features

- **Interactive Heat Map**: Washington State counties colored by appearance density (appearances per 100,000 residents)
- **County Details**: Hover over counties to see:
  - Total number of appearances
  - County population
  - Appearances per 100k residents
  - List of recent appearances with dates and locations
- **Monthly Timeline**: Bar chart showing the distribution of appearances over time
- **Responsive Design**: Works on desktop and mobile devices

## Data Sources

Data compiled from multiple sources including:
- Governor's official website (governor.wa.gov)
- TVW (Washington's public affairs network)
- Washington State Standard
- Local news outlets (Cascadia Daily News, Seattle Times, etc.)
- Social media accounts (@GovBobFerguson on Twitter/X, @govferguson on Instagram)

## Methodology

### Appearance Counts
Each documented public event is counted as one appearance, regardless of duration. Multi-day visits (e.g., the week at Western State Hospital) are counted as separate daily appearances.

### Heat Map Calculation
The heat map color intensity is based on appearances per 100,000 residents, calculated as:
```
Appearances per 100k = (Total Appearances / County Population) × 100,000
```

This normalization accounts for population differences between counties. For example:
- **Thurston County**: 9 appearances / 294,793 population = 3.05 per 100k
- **King County**: 5 appearances / 2,269,675 population = 0.22 per 100k

### Data Limitations

**Important Note**: Governor Ferguson's office has been criticized by the Washington State Standard (August 2025) for abandoning the practice of sending out regular public schedule advisories. This dataset represents a **minimum count** of actual appearances based on:
- Press releases and news coverage
- TVW recordings
- Social media posts
- Public records requests by journalists

Many appearances likely occurred that were not publicly documented.

## Key Statistics

- **Total Documented Appearances**: 31
- **Counties Visited**: 10 out of 39
- **Time Period**: January 15, 2025 - January 26, 2026
- **Average**: ~2.2 appearances per month
- **Busiest Month**: December 2025 (9 appearances - primarily flood response)
- **Most Visited County**: Thurston County (9 appearances - state capital)

## County Rankings

### By Total Appearances
1. Thurston County: 9
2. King County: 5
3. Pierce County: 5
4. Whatcom County: 4
5. Clark County: 2
6. Grays Harbor County: 2

### By Appearances per 100k Residents
1. San Juan County: 5.62 per 100k
2. Thurston County: 3.05 per 100k
3. Whatcom County: 1.76 per 100k
4. Grays Harbor County: 2.66 per 100k

## Technology Stack

- **D3.js v7**: Data visualization and mapping
- **Vanilla JavaScript**: Interactive functionality
- **CSS3**: Styling and responsive design
- **HTML5**: Structure

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process or dependencies required

```bash
git clone https://github.com/yourusername/ferguson-appearances-map.git
cd ferguson-appearances-map
open index.html  # or your preferred method to open HTML files
```

## Data Updates

To update the data with new appearances:

1. Edit `data.js`
2. Add new entries to the `appearances` array
3. Update `countyAppearances` object with new counts
4. Update `monthlyAppearances` array with new monthly totals

## Future Enhancements

Potential improvements for future versions:
- [ ] Actual GeoJSON county boundaries instead of simplified circles
- [ ] Filter by date range
- [ ] Filter by appearance type (bill signing, press conference, etc.)
- [ ] Export data to CSV
- [ ] Search functionality
- [ ] Direct links to source articles
- [ ] Mobile-optimized touch interactions

## Contributing

Contributions are welcome! If you have information about additional public appearances, please:
1. Fork the repository
2. Add the appearance data with source documentation
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- County population data: 2020 U.S. Census
- Geographic data: Washington State
- Reporting: Washington State Standard, Cascadia Daily News, Seattle Times, and local news outlets

## Contact

For questions or corrections, please open an issue on GitHub.

---

*Last Updated: February 6, 2026*

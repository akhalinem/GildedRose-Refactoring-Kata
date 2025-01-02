export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  public updateQuality() {
    const isAgedBrie = this.name === 'Aged Brie';
    const isBackstage = this.name === 'Backstage passes to a TAFKAL80ETC concert';
    const isSulfuras = this.name === 'Sulfuras, Hand of Ragnaros';

    if (!isAgedBrie && !isBackstage) {
      if (this.quality > 0) {
        if (!isSulfuras) {
          this.quality -= 1
        }
      }
    } else {
      if (this.quality < 50) {
        this.quality += 1
        if (isBackstage) {
          if (this.sellIn < 11) {
            if (this.quality < 50) {
              this.quality += 1
            }
          }
          if (this.sellIn < 6) {
            if (this.quality < 50) {
              this.quality += 1
            }
          }
        }
      }
    }

    if (!isSulfuras) {
      this.sellIn -= 1;
    }

    if (this.sellIn < 0) {
      if (!isAgedBrie) {
        if (!isBackstage) {
          if (this.quality > 0) {
            if (!isSulfuras) {
              this.quality -= 1;
            }
          }
        } else {
          this.quality = 0;
        }
      } else {
        if (this.quality < 50) {
          this.quality += 1;
        }
      }
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      item.updateQuality()
    });

    return this.items;
  }
}

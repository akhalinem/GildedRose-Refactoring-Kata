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

    if (isAgedBrie) {
      if (this.sellIn <= 0) {
        this.quality += 2;
      } else {
        this.quality += 1
      }

      this.sellIn -= 1;
      this.quality = Math.min(this.quality, 50);
    } else if (isBackstage) {
      if (this.sellIn <= 0) {
        this.quality = 0;
      } else if (this.sellIn <= 5) {
        this.quality += 3
      } else if (this.sellIn <= 10) {
        this.quality += 2
      } else {
        this.quality += 1
      }

      this.sellIn -= 1;
      this.quality = Math.min(this.quality, 50);
    } else if (isSulfuras) {
      // do nothing
    } else {
      if (this.sellIn <= 0) {
        this.quality -= 2;
      } else {
        this.quality -= 1;
      }

      this.sellIn -= 1;
      this.quality = Math.max(this.quality, 0);
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

enum ItemType {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros'
}

interface IUpdateable {
  update(): void;
}

interface ISeller extends IUpdateable {
  readonly quality: number;
  readonly sellIn: number;
}

class Seller implements ISeller, IUpdateable {
  sellIn: number;
  quality: number;

  constructor(sellIn: number, quality: number) {
    this.sellIn = sellIn;
    this.quality = quality;
  }

  public update(): void {
    if (this.sellIn <= 0) {
      this.quality -= 2;
    } else {
      this.quality -= 1;
    }

    this.sellIn -= 1;
    this.quality = Math.max(this.quality, 0);
  }
}

class AgedBrieSeller extends Seller {
  public override update(): void {
    if (this.sellIn <= 0) {
      this.quality += 2;
    } else {
      this.quality += 1
    }

    this.sellIn -= 1;
    this.quality = Math.min(this.quality, 50);
  }
}

class BackstageSeller extends Seller {
  public override update(): void {
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
  }
}

class SulfurasSeller extends Seller {
  public override update(): void { }
}

class ItemSeller {
  static get(name: string, sellIn: number, quality: number): Seller {
    switch (name) {
      case ItemType.AgedBrie:
        return new AgedBrieSeller(sellIn, quality);

      case ItemType.BackstagePasses:
        return new BackstageSeller(sellIn, quality);

      case ItemType.Sulfuras:
        return new SulfurasSeller(sellIn, quality);

      default:
        return new Seller(sellIn, quality);
    }
  }
}

export class Item {
  readonly name: string;
  private readonly seller: Seller;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.seller = ItemSeller.get(name, sellIn, quality);
  }

  public updateQuality(): void {
    this.seller.update();
  }
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality(): Item[] {
    this.items.forEach(item => {
      item.updateQuality()
    });

    return this.items;
  }
}

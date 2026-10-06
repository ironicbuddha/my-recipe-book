# Recipe image prompts

55 complete prompts covering every published recipe as of 2026-10-02: 25
recipes awaiting their first images and 30 older recipes with replacement prompts.
Each file is named for its immutable Recipe key and links to the canonical source
and reviewed version. The prompts describe ingredients, final cooking state,
surface texture, finish and framing after review of the source methods.

These are publisher-side working files. They are outside canonical Recipe
Markdown and are not loaded by Astro or copied into the public build. Do not
put image prompts in Recipe frontmatter, body text or HTML comments.

Copy the complete fenced prompt from a recipe's file when generating its image.
Use [the house reference](../../src/assets/recipes/_reference.png) as a style
reference when supported, with the constraints in
[its reference notes](../../src/assets/recipes/_reference.md). The reference
controls lighting and visual treatment, not the dish's structure.

Save the reviewed image at the target asset path in its prompt file. Older
recipes retain their dated legacy filenames, which the publisher maps to their
canonical identities; newer recipes use canonical-key filenames. Both match
the website's hero-image lookup. Do not infer an asset filename from the prompt
filename. Existing images have not been replaced and no images have been
generated for this packet. Review the prompt again when the recipe changes.
Where the source permits alternatives, the prompt chooses one permitted finish
and states any important exclusions. It does not combine every variation.

The existing `pnpm hero-prompt` command still builds an automatic prompt; it
does not read these manually written files.

The earlier [intake prompt packet](../../docs/plans/2026-10-02-recipes-tmp-review/image-prompts.md)
is preserved as historical planning evidence. These files supply more detailed,
current descriptions and dish-specific framing for the canonical versions.

| Prompt | Reviewed Recipe Version |
| --- | --- |
| [AeroPress Competition Cup](aeropress-competition-cup.md) | `recipe/aeropress-competition-cup@1` |
| [AeroPress Everyday Cup](aeropress-everyday-cup.md) | `recipe/aeropress-everyday-cup@1` |
| [Air-Fryer Roast Potatoes](air-fryer-roast-potatoes.md) | `recipe/air-fryer-roast-potatoes@1` |
| [Asian Ginger Chicken Noodle Soup](asian-ginger-chicken-noodle-soup.md) | `recipe/asian-ginger-chicken-noodle-soup@3` |
| [Banana & Desiccated Coconut Curry Accompaniment](banana-desiccated-coconut-curry-accompaniment.md) | `recipe/banana-desiccated-coconut-curry-accompaniment@1` |
| [Beef Rendang](beef-rendang.md) | `recipe/beef-rendang@1` |
| [Black Bean, Corn, Mint & Peppadew Salsa](black-bean-corn-mint-peppadew-salsa.md) | `recipe/black-bean-corn-mint-peppadew-salsa@1` |
| [Butter-Braised Leeks](butter-braised-leeks.md) | `recipe/butter-braised-leeks@1` |
| [Bún bò nướng (Grilled Beef with Rice Noodles)](bun-bo-nuong.md) | `recipe/bun-bo-nuong@1` |
| [Bún chả (Hanoi Grilled Pork with Noodles)](bun-cha.md) | `recipe/bun-cha@1` |
| [Carbonara](carbonara.md) | `recipe/carbonara@1` |
| [Carne Asada Tacos](carne-asada-tacos.md) | `recipe/carne-asada-tacos@1` |
| [Celery, Green Apple & Fennel Pollen Slaw](celery-green-apple-fennel-pollen-slaw.md) | `recipe/celery-green-apple-fennel-pollen-slaw@1` |
| [Chicken Nachos](chicken-nachos.md) | `recipe/chicken-nachos@1` |
| [Chunky Tomato Burger Sauce](chunky-tomato-burger-sauce.md) | `recipe/chunky-tomato-burger-sauce@1` |
| [Cowboy Beans (Molasses, Beef & Smoke)](cowboy-beans.md) | `recipe/cowboy-beans@1` |
| [Creamy Porcini Mushroom Ragout with Polenta](creamy-porcini-mushroom-ragout-polenta.md) | `recipe/creamy-porcini-mushroom-ragout-polenta@1` |
| [Crème Fraîche Lime Crema](creme-fraiche-lime-crema.md) | `recipe/creme-fraiche-lime-crema@1` |
| [Fennel Sausage & Caramelised Red Onion Roman-Style Pizza](fennel-sausage-caramelised-red-onion-roman-style-pizza.md) | `recipe/fennel-sausage-caramelised-red-onion-roman-style-pizza@1` |
| [Flapjacks (American Pancakes)](flapjacks-american-pancakes.md) | `recipe/flapjacks-american-pancakes@1` |
| [Fried Master Stock Chicken](fried-master-stock-chicken.md) | `recipe/fried-master-stock-chicken@1` |
| [Gratin Dauphinois](gratin-dauphinois.md) | `recipe/gratin-dauphinois@1` |
| [Grilled Pork Al Pastor (Hibachi) with Charred Pineapple-Chilli Salsa](grilled-pork-al-pastor.md) | `recipe/grilled-pork-al-pastor@1` |
| [Guanciale, Olive & Chili Pasta Sauce](guanciale-olive-chili-pasta-sauce.md) | `recipe/guanciale-olive-chili-pasta-sauce@1` |
| [Hibachi Pork with Charred Greens & Spanish Green Sauce](hibachi-pork-charred-greens-spanish-green-sauce.md) | `recipe/hibachi-pork-charred-greens-spanish-green-sauce@1` |
| [Home-Style Chicken Curry with Coconut Milk, Potatoes & Peas](home-style-chicken-curry-with-coconut-milk-potatoes-peas.md) | `recipe/home-style-chicken-curry-with-coconut-milk-potatoes-peas@1` |
| [Italian Sausages with Puy Lentils, Spiced Tomato & Red Wine Vinegar](italian-sausages-puy-lentils.md) | `recipe/italian-sausages-puy-lentils@1` |
| [Lao-Influenced Herbaceous Chicken Noodle Soup with Red & Green Jeow](lao-herbaceous-chicken-noodle-soup.md) | `recipe/lao-herbaceous-chicken-noodle-soup@1` |
| [Lasagna Bolognese with Béchamel](lasagna-bolognese-with-bechamel.md) | `recipe/lasagna-bolognese-with-bechamel@1` |
| [Malted Milk Chocolate Ice Cream with Lindt Milk Chocolate & Milo](malted-milk-chocolate-ice-cream-with-lindt-milk-chocolate-milo.md) | `recipe/malted-milk-chocolate-ice-cream-with-lindt-milk-chocolate-milo@1` |
| [Manchego with Thyme-Infused Honey & Coffee Dust](manchego-thyme-infused-honey-coffee-dust.md) | `recipe/manchego-thyme-infused-honey-coffee-dust@1` |
| [Maple Pecan Pie](maple-pecan-pie.md) | `recipe/maple-pecan-pie@3` |
| [Maple-Bourbon Butter Pecan Ice Cream](maple-bourbon-butter-pecan-ice-cream.md) | `recipe/maple-bourbon-butter-pecan-ice-cream@1` |
| [Masterclass Chocolate Brownie](masterclass-chocolate-brownie.md) | `recipe/masterclass-chocolate-brownie@1` |
| [Mint Chutney](mint-chutney.md) | `recipe/mint-chutney@1` |
| [Miso Butter for Roasted Brussels Sprouts](miso-butter-for-roasted-brussels-sprouts.md) | `recipe/miso-butter-for-roasted-brussels-sprouts@1` |
| [Monkey Gland Chicken](monkey-gland-chicken.md) | `recipe/monkey-gland-chicken@1` |
| [Nacho Cheese Sauce](nacho-cheese-sauce.md) | `recipe/nacho-cheese-sauce@1` |
| [Porchetta with Fennel Pollen & Salsa Verde](porchetta-fennel-pollen-salsa-verde.md) | `recipe/porchetta-fennel-pollen-salsa-verde@1` |
| [Pressure-Cooker Black Beans for Tacos](pressure-cooker-black-beans-for-tacos.md) | `recipe/pressure-cooker-black-beans-for-tacos@1` |
| [Pressure-Cooker Charro Beans](pressure-cooker-charro-beans.md) | `recipe/pressure-cooker-charro-beans@1` |
| [Reverse-Seared Fillet with Hibachi Cabbage, Steakhouse Fries & Gochujang Sauce](reverse-seared-fillet-hibachi-cabbage-steakhouse-fries-gochujang-sauce.md) | `recipe/reverse-seared-fillet-hibachi-cabbage-steakhouse-fries-gochujang-sauce@1` |
| [Salsa Verde](salsa-verde.md) | `recipe/salsa-verde@1` |
| [Salted Caramel Ice Cream with Salted Caramel Ripple](salted-caramel-ice-cream-with-salted-caramel-ripple.md) | `recipe/salted-caramel-ice-cream-with-salted-caramel-ripple@1` |
| [Singapore Chicken Rice (Hainanese)](singapore-chicken-rice.md) | `recipe/singapore-chicken-rice@1` |
| [Sour Cherry Pie](sour-cherry-pie.md) | `recipe/sour-cherry-pie@2` |
| [Sourdough Bread](sourdough-bread.md) | `recipe/sourdough-bread@1` |
| [Soy Garlic Sesame Gochujang Hibachi Chicken Tacos](soy-garlic-sesame-gochujang-hibachi-chicken-tacos.md) | `recipe/soy-garlic-sesame-gochujang-hibachi-chicken-tacos@1` |
| [Spanish Chicken and Chorizo Stew](spanish-chicken-chorizo-stew.md) | `recipe/spanish-chicken-chorizo-stew@1` |
| [Spicy Korean Fried Chicken (Yangnyeom Dak)](spicy-korean-fried-chicken.md) | `recipe/spicy-korean-fried-chicken@1` |
| [Tamarind Chutney](tamarind-chutney.md) | `recipe/tamarind-chutney@1` |
| [Tomato & Onion Curry Chutney](tomato-onion-curry-chutney.md) | `recipe/tomato-onion-curry-chutney@1` |
| [Tomato Bredie — Lamb Neck, Toasted Coriander, Ginger & Red Wine Vinegar](tomato-bredie.md) | `recipe/tomato-bredie@2` |
| [Traditional Greek Lentil Soup (Fakes)](traditional-greek-lentil-soup-fakes.md) | `recipe/traditional-greek-lentil-soup-fakes@1` |
| [Vanilla Bean Ice Cream](vanilla-bean-ice-cream.md) | `recipe/vanilla-bean-ice-cream@1` |
